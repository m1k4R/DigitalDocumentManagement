using System;
using System.IO;

namespace CVManager.RequestsAndResponses
{
    public class DownloadCvByIdRequest
{
    public Guid DocumentId { get; set; }
}

    public class DownloadCvByIdResponse
    {
        public FileStream CvContent { get; set; }
        public string CvName { get; set; }
    }
}
