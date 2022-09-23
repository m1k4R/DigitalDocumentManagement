using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CVManager.RequestsAndResponses
{
    public class CreateApplicationRequest
    {
        public string ApplicantFirstname { get; set; }
        public string ApplicantLastname { get; set; }
        public string ApplicantPhone { get; set; }
        public string ApplicantEmail { get; set; }
        public int ApplicantEducationLevel { get; set; }
        public string CityName { get; set; }
        public IFormFile CvFile { get; set; }
        public IFormFile CoverLetterFile { get; set; }
    }

    public class CreateApplicationResponse
    {
        public Guid ApplicationId { get; set; }
    }
}
