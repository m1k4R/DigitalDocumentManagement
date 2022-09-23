using CVManager.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CVManager.RequestsAndResponses
{
    public class GetApplicantsByGeoLocationRequest
    {
        public string City { get; set; }
        public int Radius { get; set; }
    }

    public class GetApplicantsByGeoLocationResponse
    {
        public List<ResultWithHighlightsResponse> SearchResults { get; set; }
    }
}
