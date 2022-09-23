using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CVManager.RequestsAndResponses;
using CVManager.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CVManager.Controllers
{
    [ApiController]
    [Area("admin")]
    [Route("api/[area]/[controller]")]
    public class ManagementController : ControllerBase
    {
        private readonly ICVManagerService _managerService;
        public ManagementController(ICVManagerService managerService)
        {
            _managerService = managerService ?? throw new ArgumentNullException(nameof(managerService));
        }

        [HttpGet("search-by-education-level")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchByEducationLevel([FromQuery] SearchApplicationsByApplicantEducationLevelRequest request,
        CancellationToken token = default)
        {
            var response = await _managerService.SearchApplicationsByApplicantEducationLevel(request, token);
            return Ok(response);
        }

        [HttpGet("search-by-cover-letter")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchByCoverLetterContent([FromQuery] SearchApplicantsByCoverLetterContentRequest request,
        CancellationToken token = default)
        {
            var response = await _managerService.SearchApplicantsByCoverLetterContent(request, token);
            return Ok(response);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll(CancellationToken token = default)
        {
            var response = await _managerService.GetAllApplications(token);
            return Ok(response);
        }

        [HttpGet("index-test-data")]
        [AllowAnonymous]
        public async Task<IActionResult> IndexTestData(CancellationToken token = default)
        {
            await _managerService.IndexTestData(token);
            return Ok();
        }

        [HttpGet("search-by-phrase")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchByEducationLevel([FromQuery] SearchApplicantsByPhraseRequest request,
        CancellationToken token = default)
        {
            var response = await _managerService.SearchApplicantsByPhraseResponse(request, token);
            return Ok(response);
        }

        [HttpGet("search-by-radius")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchByCityRadius([FromQuery] GetApplicantsByGeoLocationRequest request,
        CancellationToken token = default)
        {
            var response = await _managerService.GetApplicationsByGeoLocation(request, token);
            return Ok(response);
        }

        [HttpGet("download-cv/{documentId:guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetApplicantCv([FromRoute] DownloadCvByIdRequest request, CancellationToken token = default)
        {
            var response = await _managerService.DownloadCvById(request, token);
            return File(response.CvContent, "application/octet-stream", response.CvName);
        }
    }
}
