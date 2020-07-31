using Agenda.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda.Controllers.Agenda.Commands.ObterContatos
{
    public class ObterContatosCommand : IRequest<List<Contato>>
    {
        //Algum filtro
    }
}
