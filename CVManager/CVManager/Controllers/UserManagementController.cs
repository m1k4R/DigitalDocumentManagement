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
    [Route("api/[controller]")]
    public class UserManagementController : ControllerBase
    {
        private readonly ICVManagerService _managerService;
        public UserManagementController(ICVManagerService managerService)
        {
            _managerService = managerService ?? throw new ArgumentNullException(nameof(managerService));
        }

        [HttpPost("create")]
        [AllowAnonymous]
        public async Task<IActionResult> ValidateAddress([FromForm] CreateApplicationRequest request, CancellationToken token = default)
        {
            var response = await _managerService.CreateApplication(request, token);
            return Ok(response);
        }
    }
}
