using CVManager.Services.Models;
using System.Collections.Generic;

namespace CVManager.RequestsAndResponses
{
    public class SearchApplicationsByApplicantEducationLevelRequest
    {
        public int? EducationLevel { get; set; }
    }

    public class SearchApplicationsByApplicantEducationLevelResponse
    {
        public List<ResultWithHighlightsResponse> SearchResults { get; set; }
    }
}
