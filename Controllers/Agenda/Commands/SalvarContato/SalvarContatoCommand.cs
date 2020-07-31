using Agenda.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda.Controllers.Agenda.Commands.SalvarContato
{
    public class SalvarContatoCommand : IRequest<Contato>
    {
        public Contato Contato { get; set; }
    }
}
