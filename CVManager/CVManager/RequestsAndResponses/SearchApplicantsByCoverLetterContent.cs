using CVManager.Services.Models;
using System.Collections.Generic;

namespace CVManager.RequestsAndResponses
{
    public class SearchApplicantsByCoverLetterContentRequest
{
    public string Content { get; set; }
}

    public class SearchApplicantsByCoverLetterContentResponse
    {
        public List<ResultWithHighlightsResponse> SearchResults { get; set; }
    }
}
