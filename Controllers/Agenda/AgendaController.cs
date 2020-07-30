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


        [HttpPost]
        [Route("Agenda/SalvarContato/")]
        public async Task<IActionResult> SalvarContato([FromBody]SalvarContatoCommand request)
        {
            request.Cenario.PlanosCondicoesComerciais.ForEach(x => x.Coberturas.RemoveAll(y => !y.Selecionado));

            var result = await _mediator.Send(request);

            var messages = new List<string>() { "Cenário salvo com sucesso!" };
            if (result.Messages.Any())
                messages = result.Messages;

            return StatusCode(result.StatusCode, messages);
        }

    }
}
