using CVManager.ElasticIndex;
using CVManager.Repository;
using CVManager.RequestsAndResponses;
using CVManager.Services.Interfaces;
using CVManager.Services.Models;
using Nest;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CVManager.Services
{
    public class CVManagerService : ICVManagerService
    {
        private readonly IElasticClient _elasticClient;
        private readonly IMapResponseWithHighlights _mapResponseWithHighlightsService;
        private readonly IGeoLocationDecodeService _geoLocationDecodeService;
        private readonly IFileService _fileService;

        public CVManagerService(IElasticClient elasticClient,
            IMapResponseWithHighlights mapResponseWithHighlightsService, 
            IGeoLocationDecodeService geoLocationDecodeService,
            IFileService fileService)
        {
            _elasticClient = elasticClient ?? throw new ArgumentNullException(nameof(elasticClient));
            _mapResponseWithHighlightsService = mapResponseWithHighlightsService ??
                                                throw new ArgumentNullException(nameof(mapResponseWithHighlightsService));
            _geoLocationDecodeService = geoLocationDecodeService ?? throw new ArgumentNullException(nameof(geoLocationDecodeService));
            _fileService = fileService ?? throw new ArgumentNullException(nameof(fileService));
        }
        public async Task<CreateApplicationResponse> CreateApplication(CreateApplicationRequest request, CancellationToken cancellationToken)
        {
            var city = await _geoLocationDecodeService.DecodeCityLatLong(request.CityName);

            var newApplication = new Application { 
                ApplicantEducationLevel = request.ApplicantEducationLevel, 
                ApplicantEmail = request.ApplicantEmail, 
                ApplicantFirstname = request.ApplicantFirstname, 
                ApplicantLastname = request.ApplicantLastname, 
                ApplicantPhone = request.ApplicantPhone, 
                CityName = request.CityName
            };
            newApplication.LatLongLocation = new GeoLocation(city.Latitude, city.Longitude);
            newApplication.DateCreated = DateTime.UtcNow;
            newApplication.Id = Guid.NewGuid();
            newApplication.CvContent = _fileService.ReadTextFromPdfFile(request.CvFile);
            newApplication.CoverLetterContent = _fileService.ReadTextFromPdfFile(request.CoverLetterFile);
            newApplication.CvFileName = request.CvFile.FileName;
            newApplication.CoverLetterFileName = request.CoverLetterFile.FileName;

            var response = await _elasticClient.CreateDocumentAsync(newApplication, cancellationToken);

            if (response.IsValid)
            {
                var cvFilePath = @$"JobApplications/{DateTime.UtcNow.Date.ToString("d")}/{newApplication.Id}/cv-{request.CvFile.FileName}";
                var coverLetterPath = @$"JobApplications/{DateTime.UtcNow.Date.ToString("d")}/{newApplication.Id}/cover-letter-{request.CoverLetterFile.FileName}";

                _fileService.SaveFileToDirectory(cvFilePath, request.CvFile);
                _fileService.SaveFileToDirectory(coverLetterPath, request.CoverLetterFile);

                return new CreateApplicationResponse
                {
                    ApplicationId = newApplication.Id
                };
            }

            throw new Exception("");
        }

        public async Task DeleteApplicationById(DeleteApplicationByIdRequest request, CancellationToken cancellationToken)
        {
            var result = await _elasticClient.DeleteAsync<Application>(request.DocumentId, ct: cancellationToken);
            return;
        }

        public async Task<DownloadCvByIdResponse> DownloadCvById(DownloadCvByIdRequest request, CancellationToken cancellationToken)
        {
            var response = await _elasticClient.GetAsync<Application>(request.DocumentId,
             getDescriptor => getDescriptor.Index("cv_management"), cancellationToken);
            var document = response.Source;
            var cvFilePath =
                @$"JobApplications/{document.DateCreated.ToString("d")}/{document.Id}/cv-{document.CvFileName}";

            FileStream stream = new FileStream(cvFilePath, FileMode.Open);
            return new DownloadCvByIdResponse
            {
                CvContent = stream,
                CvName = document.CvFileName
            };
        }

        public async Task<GetAllApplicationsResponse> GetAllApplications(CancellationToken cancellation)
        {
            var searchResponse = await _elasticClient.SearchAsync<Application>(
            searchDescriptor => searchDescriptor.Query(query =>
                query.MatchAll()), cancellation);

            var searchResults = _mapResponseWithHighlightsService.Map(searchResponse);

            var result = new GetAllApplicationsResponse
            {
                SearchResults = searchResults
            };

            return result;
        }
    

        public async Task<GetApplicantsByGeoLocationResponse> GetApplicationsByGeoLocation(GetApplicantsByGeoLocationRequest request, CancellationToken cancellationToken)
        {
            var city = await _geoLocationDecodeService.DecodeCityLatLong(request.City);

            var searchResponse = await _elasticClient.SearchAsync<Application>(
                s => s.Query(q => q
                    .GeoDistance(g => g
                        .Boost(1.1)
                        .Name("geo_query")
                        .Field(p => p.LatLongLocation)
                        .DistanceType(GeoDistanceType.Arc)
                        .Location(city.Latitude, city.Longitude)
                        .Distance(request.Radius, DistanceUnit.Kilometers)
                        .ValidationMethod(GeoValidationMethod.IgnoreMalformed)
                    )), cancellationToken);

            var searchResults = _mapResponseWithHighlightsService.Map(searchResponse);

            var result = new GetApplicantsByGeoLocationResponse
            {
                SearchResults = searchResults
            };

            return result;
        } 

        public async Task IndexTestData(CancellationToken cancellationToken)
        {
            foreach (var application in MockData.GetTestData())
            {
                var response = await _elasticClient.CreateDocumentAsync(application, cancellationToken);
            }

            return;
        }

        public async Task<SearchApplicantsByCoverLetterContentResponse> SearchApplicantsByCoverLetterContent(SearchApplicantsByCoverLetterContentRequest request, CancellationToken cancellationToken)
        {
            var searchResponse = await _elasticClient.SearchAsync<Application>(s => s
            .Query(queryContainer => queryContainer
                .Bool(boolQuery => boolQuery
                    .Must(must => must
                        .QueryString(queryString => queryString
                            .Fields(fields => fields.Field(application => application.CoverLetterContent))
                            .Query(request.Content)
                        )
                    )
                )
            ).Highlight(highlight => highlight
                .Fields(highlightField => highlightField
                    .Field(application => application.CoverLetterContent)
                    .PreTags("<em><b class='highlight'>")
                    .PostTags("</b></em>")
                )), cancellationToken);

            var searchResults = _mapResponseWithHighlightsService.Map(searchResponse);

            var result = new SearchApplicantsByCoverLetterContentResponse
            {
                SearchResults = searchResults
            };

            return result;
        }

        public async Task<SearchApplicantsByPhraseResponse> SearchApplicantsByPhraseResponse(SearchApplicantsByPhraseRequest request, CancellationToken cancellationToken)
        {
            var searchResponse = await _elasticClient.SearchAsync<Application>(s => s
            .Query(queryContainer => queryContainer
                .MultiMatch(multiMatch => multiMatch
                    .Fields(fields => fields
                        .Field(application => application.ApplicantFirstname)
                        .Field(application => application.ApplicantLastname)
                        .Field(application => application.ApplicantPhone)
                        .Field(application => application.ApplicantEmail)
                        .Field(application => application.CityName)
                        .Field(application => application.CvContent)
                        .Field(application => application.CoverLetterContent)
                    )
                    .Query(request.PhraseQuery)
                    .Type(TextQueryType.Phrase)
                )
            ).Highlight(highLights => highLights
                .Fields(field => field
                    .Field("*")
                    .PreTags("<em><b class='highlight'>")
                    .PostTags("</b></em>")
                )), cancellationToken);

            var searchResults = _mapResponseWithHighlightsService.Map(searchResponse);

            var result = new SearchApplicantsByPhraseResponse
            {
                SearchResults = searchResults
            };

            return result;
        }

        public async Task<SearchApplicationsByApplicantEducationLevelResponse> SearchApplicationsByApplicantEducationLevel(SearchApplicationsByApplicantEducationLevelRequest request, CancellationToken cancellationToken)
        {
            var searchResponse = await _elasticClient.SearchAsync<Application>(
            searchDescriptor => searchDescriptor.Query(queryContainer =>
                queryContainer.Term(application => application.ApplicantEducationLevel, request.EducationLevel)), cancellationToken);

            var searchResults = _mapResponseWithHighlightsService.Map(searchResponse);

            var result = new SearchApplicationsByApplicantEducationLevelResponse
            {
                SearchResults = searchResults
            };

            return result;
        }

        public async Task<SearchByCombinedParametersResponse> SearchByCombinedParameters(SearchByCombinedParametersRequest request, CancellationToken cancellationToken)
        {
            var firstnameQuery = new MatchQuery()
            {
                Field = Infer.Field<Application>(path => path.ApplicantFirstname),
                Query = request.ApplicantFirstname
            };

            var lastNameQuery = new MatchQuery()
            {
                Field = Infer.Field<Application>(path => path.ApplicantLastname),
                Query = request.ApplicantLastname
            };

            var educationLevelQuery = new MatchQuery()
            {
                Field = Infer.Field<Application>(path => path.ApplicantEducationLevel),
                Query = request.ApplicantEducationLevel.ToString()
            };

            var coverLetterContentQuery = new MatchQuery()
            {
                Field = Infer.Field<Application>(path => path.CoverLetterContent),
                Query = request.CoverLetterContent
            };

            var must = new List<QueryContainer>();
            var should = new List<QueryContainer>();

            if (request.FirstOperator == QueryOperator.AND)
            {
                must.Add(firstnameQuery);
                must.Add(lastNameQuery);
            }
            else
            {
                should.Add(firstnameQuery);
                should.Add(lastNameQuery);
            }

            if (request.SecondOperator == QueryOperator.AND)
            {
                if (!must.Contains(lastNameQuery))
                {
                    must.Add(lastNameQuery);
                    should.Remove(lastNameQuery);
                }

                must.Add(educationLevelQuery);
            }
            else
            {
                should.Add(educationLevelQuery);
            }


            if (request.ThirdOperator == QueryOperator.AND)
            {
                if (!must.Contains(educationLevelQuery))
                {
                    must.Add(educationLevelQuery);
                    should.Remove(educationLevelQuery);
                }

                must.Add(coverLetterContentQuery);
            }
            else
            {
                should.Add(coverLetterContentQuery);
            }

            var searchResponse = await _elasticClient.SearchAsync<Application>(new SearchRequest<Application>
            {
                Query = new BoolQuery()
                {
                    Must = must,
                    Should = should
                },
                Highlight = new Highlight
                {
                    PreTags = new[] { "<em><b class='highlight'>" },
                    PostTags = new[] { "</b><em>" },
                    Encoder = HighlighterEncoder.Html,
                    Fields = new Dictionary<Field, IHighlightField>
                {
                    {
                        "cvContent", new HighlightField
                        {
                            Type = HighlighterType.Plain,
                            ForceSource = true,
                        }
                    }
                }
                }
            }, cancellationToken);

            var searchResults = _mapResponseWithHighlightsService.Map(searchResponse);

            var result = new SearchByCombinedParametersResponse
            {
                SearchResults = searchResults
            };

            return result;
        }

        public async Task<SearchDocumentsByApplicantNameResponse> SearchDocumentsByApplicantName(SearchDocumentsByApplicantNameRequest request, CancellationToken cancellationToken)
        {
            var searchResponse = await _elasticClient.SearchAsync<Application>(s => s
            .Query(q => q
                .Bool(b => b
                    .Should(mu => mu
                            .Match(m => m
                                .Field(f => f.ApplicantFirstname)
                                .Query("*" + request.Firstname + "*")
                            ), mu => mu
                            .Match(m => m
                                .Field(f => f.ApplicantLastname)
                                .Query("*" + request.Lastname + "*")
                            )
                    )
                )
            ), cancellationToken);

            var searchResults = _mapResponseWithHighlightsService.Map(searchResponse);

            var result = new SearchDocumentsByApplicantNameResponse
            {
                SearchResults = searchResults
            };

            return result;
        }
    }
}
