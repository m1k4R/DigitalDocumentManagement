using CVManager.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CVManager.RequestsAndResponses
{
    public class SearchDocumentsByApplicantNameRequest
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }

    public class SearchDocumentsByApplicantNameResponse
    {
        public List<ResultWithHighlightsResponse> SearchResults { get; set; }
    }
}
