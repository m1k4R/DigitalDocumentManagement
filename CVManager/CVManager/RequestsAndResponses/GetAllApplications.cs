using CVManager.Services.Models;
using System.Collections.Generic;

namespace CVManager.RequestsAndResponses
{
    public class GetAllApplicationsResponse
    {
        public List<ResultWithHighlightsResponse> SearchResults { get; set; }
    }
}
