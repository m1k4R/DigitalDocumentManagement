using System.Collections.Generic;
using CVManager.ElasticIndex;
using CVManager.Services.Models;
using Nest;

namespace CVManager.Services.Interfaces
{
    public interface IMapResponseWithHighlights
    {
        List<ResultWithHighlightsResponse> Map(ISearchResponse<Application> searchResponse);
    }
}
