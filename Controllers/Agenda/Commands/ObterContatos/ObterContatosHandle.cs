using Agenda.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Agenda.Controllers.Agenda.Commands.ObterContatos
{
    public class ObterContatosHandle : IRequestHandler<ObterContatosCommand, List<Contato>>
    {
        //private readonly IAgendaRepository _repository;

        //public SalvarContatoHandle(IAgendaRepository repository)
        //{
        //    _repository = repository;
        //}

        public async Task<List<Contato>> Handle(ObterContatosCommand request, CancellationToken cancellationToken)
        {
            ////Caso tivesse uma camada de persistencia de dados ou chamasse uma API
            ///

            //return await _repository.BuscarContatos(); 

            return ObterListaMock();
        }

        private List<Contato> ObterListaMock()
        {
            var listaTempContatos = new List<Contato>();

            for (int i = 0; i < 5; i++)
            {
                listaTempContatos.Add(new Contato()
                {
                    IdContato = i + 1,
                    Nome = $"Nome Exemplo {i + 1}",
                    Emails = new List<string>() { $"nome{i}@exemplo.com" },
                    Telefones = new List<string>() { $"(11)99999999{i}" },
                }); ;
            }

            return listaTempContatos;
        }
    }
}
