using Agenda.Controllers.Agenda.Commands.DeletarContato;
using Agenda.Controllers.Agenda.Commands.ObterContatos;
using Agenda.Controllers.Agenda.Commands.SalvarContato;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda.Controllers.Agenda
{
    public class AgendaController : Controller
    {
        private IMediator _mediator { get; }

        public AgendaController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        [Route("Agenda/ObterContatos/")]
        public async Task<IActionResult> ObterContatos([FromQuery] ObterContatosCommand request)
        {
            var result = await _mediator.Send(request);
                        
            return StatusCode(200, result);
        }

        [HttpPost]
        [Route("Agenda/SalvarContato/")]
        public async Task<IActionResult> SalvarContato([FromBody] SalvarContatoCommand request)
        {
            var result = await _mediator.Send(request);

            return StatusCode(200, result);
        }

        [HttpGet]
        [Route("Agenda/DeletarContato/{IdContato}")]
        public async Task<IActionResult> DeletarContato([FromQuery] DeletarContatoCommand request)
        {
            var result = await _mediator.Send(request);

            return StatusCode(200, result);
        }
    }
}
