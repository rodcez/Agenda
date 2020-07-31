using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda.Models
{
    public class Contato
    {
        public int IdContato { get; set; }
        public string Nome { get; set; }
        public List<string> Emails { get; set; }
        public List<string> Telefones { get; set; }
    }
}
