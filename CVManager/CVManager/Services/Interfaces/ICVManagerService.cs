using CVManager.RequestsAndResponses;
using System.Threading;
using System.Threading.Tasks;

namespace CVManager.Services.Interfaces
{
    public interface ICVManagerService
    {
        Task<CreateApplicationResponse> CreateApplication(CreateApplicationRequest request, CancellationToken cancellationToken);
        Task DeleteApplicationById(DeleteApplicationByIdRequest request, CancellationToken cancellationToken);
        Task<DownloadCvByIdResponse> DownloadCvById(DownloadCvByIdRequest request, CancellationToken cancellationToken);
        Task<GetAllApplicationsResponse> GetAllApplications(CancellationToken cancellation);
        Task<GetApplicantsByGeoLocationResponse> GetApplicationsByGeoLocation(GetApplicantsByGeoLocationRequest request, CancellationToken cancellationToken);
        Task IndexTestData(CancellationToken cancellationToken);
        Task<SearchApplicantsByCoverLetterContentResponse> SearchApplicantsByCoverLetterContent(SearchApplicantsByCoverLetterContentRequest request, CancellationToken cancellationToken);
        Task<SearchApplicantsByPhraseResponse> SearchApplicantsByPhraseResponse(SearchApplicantsByPhraseRequest request, CancellationToken cancellationToken);
        Task<SearchApplicationsByApplicantEducationLevelResponse> SearchApplicationsByApplicantEducationLevel(SearchApplicationsByApplicantEducationLevelRequest request, CancellationToken cancellationToken);
        Task<SearchByCombinedParametersResponse> SearchByCombinedParameters(SearchByCombinedParametersRequest request, CancellationToken cancellationToken);
        Task<SearchDocumentsByApplicantNameResponse> SearchDocumentsByApplicantName(SearchDocumentsByApplicantNameRequest request, CancellationToken cancellationToken);
    }
}
