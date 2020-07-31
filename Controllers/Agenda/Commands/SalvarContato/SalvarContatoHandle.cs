using Agenda.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Agenda.Controllers.Agenda.Commands.SalvarContato
{
    public class SalvarContatoHandle : IRequestHandler<SalvarContatoCommand, Contato>
    {
        //private readonly IAgendaRepository _repository;

        //public SalvarContatoHandle(IAgendaRepository repository)
        //{
        //    _repository = repository;
        //}

        public async Task<Contato> Handle(SalvarContatoCommand request, CancellationToken cancellationToken)
        {
            ////Caso tivesse uma camada de persistencia de dados ou chamasse uma API
            ///

            //return await _repository.SalvarContato<SalvarContatoCommand>(request); 

            return new Contato();
        }
    }
}
