using CVManager.Services.Models;
using System.Collections.Generic;

namespace CVManager.RequestsAndResponses
{
    public class SearchByCombinedParametersRequest
{
    public string ApplicantFirstname { get; set; }
    public string ApplicantLastname { get; set; }
    public int ApplicantEducationLevel { get; set; }
    public string CoverLetterContent { get; set; }
    public QueryOperator FirstOperator { get; set; }
    public QueryOperator SecondOperator { get; set; }
    public QueryOperator ThirdOperator { get; set; }
}

public class SearchByCombinedParametersResponse
{
    public List<ResultWithHighlightsResponse> SearchResults { get; set; }
}

public enum QueryOperator
{
    AND,
    OR
}
}
