using System.Collections.Generic;
using System.Linq;
using CVManager.ElasticIndex;
using CVManager.Services.Interfaces;
using CVManager.Services.Models;
using Nest;

namespace CVManager.Services
{
    public class MapResponseWithHighlightsService : IMapResponseWithHighlights
    {
        public MapResponseWithHighlightsService() { }

        public List<ResultWithHighlightsResponse> Map(ISearchResponse<Application> searchResponse)
        {
            var allResults = new List<ResultWithHighlightsResponse>();
            foreach (var document in searchResponse.Documents)
            {
                var result = new ResultWithHighlightsResponse
                {
                    Application = new ApplicationSearchResponse
                    {
                        ApplicantEducationLevel = document.ApplicantEducationLevel,
                        ApplicantEmail = document.ApplicantEmail,
                        ApplicantFirstname = document.ApplicantFirstname,
                        ApplicantLastname = document.ApplicantLastname,
                        ApplicantPhone = document.ApplicantPhone,
                        CityName = document.CityName,
                        CoverLetterContent = document.CoverLetterContent,
                        CoverLetterFileName = document.CoverLetterFileName,
                        CvContent = document.CvContent,
                        CvFileName = document.CvFileName,
                        DateCreated = document.DateCreated,
                        Id = document.Id
                    },
                    Highlights = new List<string>()
                };

                var documentHits = searchResponse.Hits.Where(hit => hit.Id == document.Id.ToString()).ToList();
                var highlights = documentHits.Select(hit => hit.Highlight);

                foreach (var highlight in highlights)
                {
                    foreach (var highlightValue in highlight.Values)
                    {
                        foreach (var value in highlightValue)
                        {
                            if (value != null)
                        {
                                result.Highlights.Add(value);
                            }
                        }
                    }
                }
                allResults.Add(result);
            }

            return allResults;
        }
    }
}
