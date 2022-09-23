using CVManager.Services.Models;
using System.Collections.Generic;

namespace CVManager.RequestsAndResponses
{
    public class SearchApplicantsByPhraseRequest
    {
    public string PhraseQuery { get; set; }
    }

    public class SearchApplicantsByPhraseResponse
    {
        public List<ResultWithHighlightsResponse> SearchResults { get; set; }
    }
}
