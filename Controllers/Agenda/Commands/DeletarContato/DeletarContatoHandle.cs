using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Agenda.Controllers.Agenda.Commands.DeletarContato
{
    public class DeletarContatoHandle : IRequestHandler<DeletarContatoCommand>
    {
        //private readonly IAgendaRepository _repository;

        //public SalvarContatoHandle(IAgendaRepository repository)
        //{
        //    _repository = repository;
        //}

        public async Task<Unit> Handle(DeletarContatoCommand request, CancellationToken cancellationToken)
        {
            ////Caso tivesse uma camada de persistencia de dados ou chamasse uma API
            ///

            //return await _repository.DeletarContato<int>(request.int); 

            return default;
        }
    }
}
