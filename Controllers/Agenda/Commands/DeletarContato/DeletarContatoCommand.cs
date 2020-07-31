using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda.Controllers.Agenda.Commands.DeletarContato
{
    public class DeletarContatoCommand : IRequest
    {
        public int IdContato { get; set; }
    }
}
