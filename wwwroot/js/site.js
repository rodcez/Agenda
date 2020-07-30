var idContato = 0;
var listaContato = [];
var contatoAtual = {};

window.agendaUi = {
    popularContatoModal: function () {
        if (idContato === 0) 
            return;

        var contato = listaContato.filter(function (c) {
            return c.idContato == idContato;
        });

        if (contato.length <= 0)
            return;

        $("inputNome").val(contato[0].Nome);

        contato[0].Emails.forEach(function (email) {
            $("listaInputEmail").val(email + ";");
        })

        contato[0].Telefones.forEach(function (tels) {
            $("listaInputTel").val(tels + "; ");
        })
    },

    limparModal: function () {
        $("inputNome").val("");

        $("listaInputEmail").val("");
        $("inputEmail").val("");

        $("listaInputTel").val("");
        $("inputTel").val("");
    }
}

window.agendaFunctions = {

    salvarContato: function (callback) {
        $.ajax({
            url: '/Agenda/SalvarContato',
            type: 'post',
            contentType: "application/json",
            success: function (data) {
                callback && callback();
            },
            error: function (data) {

            },
            data: JSON.stringify({
                
            })
        })
    },

    obterListaContato: function () {
        //Funcao Ajax para obterListaContato
    },

    deletarContato: function () {
        //Funcao Ajax para deletarContato
    },

    popularObjetoContato: function () {
        contatoAtual = {};
        contatoAtual.idContato = listaContato.length + 1;
        contatoAtual.Nome = $("inputNome").val();
        contatoAtual.Emails = $("listaInputEmail").val().split(";");
        contatoAtual.Telefones = $("listaInputTel").val().split(";");
    }
}

window.agendaEvents = {

    onClickNovoContato: function () {
        idContato = 0;
        $('#modelContato').modal('show');
        window.agendaUi.limparModal();
    },
    
    onClickEditarContato: function () {
        idContato = 0; //Pegar o id da linha clicada
        $('#modelContato').modal('show');
        window.agendaUi.limparModal();
        window.agendaUi.popularContatoModal();
    },
    
    onClickSalvarContato: function () {
        window.agendaFunctions.popularObjetoContato();
        window.agendaFunctions.salvarContato();
    },
    
    onClickDeletarContato: function () {
        idContato = 0; //Pegar o id da linha clicada
        window.agendaFunctions.popularObjetoContato();
        window.agendaFunctions.deletarContato();
    }
}