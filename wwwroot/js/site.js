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

        $("#inputNome").val(contato[0].Nome);

        contato[0].Emails.forEach(function (email) {
            $("#listaInputEmail").val(email + ";");
        })

        contato[0].Telefones.forEach(function (tels) {
            $("#listaInputTel").val(tels + "; ");
        })
    },

    criarEstruturaTable: function () {
        $('#divTableContatos').empty();

        $('#divTableContatos').html(
            '<table class="table table-striped table-sm table-bordered" id="tableContatos">' +
            '   <thead>' +
            '       <tr style="font-size:13px;">' +
            '           <th>Nome</th>' +
            '           <th>Emails</th>' +
            '           <th>Telefones</th>' +
            '           <th></th>' +
            '       </tr>' +
            '   </thead>' +
            '   <tbody></tbody>' +
            '</table>');
    },

    popularGridContatos: function () {

        window.agendaUi.criarEstruturaTable();

        if (listaContato.length <= 0)
            return;

        listaContato.forEach(function (contato) {

            var buttonEditar = '<button type="button" class="btn btn - dark" data-toggle="modal" data-target="#modelContato" onclick="window.agendaEvents.onClickEditarContato(' + contato.idContato + ')">Editar</button>';

            $('#tableContatos > tbody').append(
                '<tr id="idContatoGrid_' + contato.idContato + '">' +
                '   <td>' + contato.Nome + '</td>' +
                '   <td>' + contato.Emails.toString().replace(/(.{20})..+/, "$1…") + '</td>' +
                '   <td>' + contato.Telefones.toString().replace(/(.{20})..+/, "$1…") + '</td>' +
                '   <td>' + buttonEditar + '</td>' +
                '</tr> ');
        });

    },

    limparModal: function () {
        $("#inputNome").val("");

        $("#listaInputEmail").val("");
        $("#inputEmail").val("");

        $("#listaInputTel").val("");
        $("#inputTel").val("");

        $("#btnExcluirContato").show();
    }
}

window.agendaFunctions = {

    init: function () {
        window.agendaFunctions.obterListaContato();
    },

    salvarContato: function (callback) {
        $.ajax({
            url: '/Agenda/SalvarContato',
            type: 'post',
            contentType: "application/json",
            success: function (data) {
                listaContato.push(contatoAtual);
                window.agendaUi.popularGridContatos();
                alert(data);
                callback && callback();
            },
            error: function (data) {
                alert(data);
            },
            data: JSON.stringify({
                Contato: contatoAtual
            })
        })
    },

    obterListaContato: function () {
        $.ajax({
            url: '/Agenda/ObterContatos',
            type: 'get',
            contentType: "application/json",
            success: function (data) {
                listaContato = data;
                window.agendaUi.popularGridContatos();
                callback && callback();
            },
            error: function (data) {
                alert(data);
            }
        })
    },

    deletarContato: function () {
        var contato = listaContato.filter(function (c) {
            return c.idContato == idContato;
        });

        if (contato.length >= 0) {
            $.ajax({
                url: '/Agenda/DeletarContato' + contato[0].idContato,
                type: 'get',
                contentType: "application/json",
                success: function (data) {
                    listaContato.splice(listaContato.indexOf(contato[0]), 1);
                    window.agendaUi.popularGridContatos();
                    alert(data);
                    callback && callback();
                },
                error: function (data) {
                    alert(data);
                }
            })
        }
    },

    popularObjetoContato: function () {
        contatoAtual = {};
        contatoAtual.idContato = listaContato.length + 1;
        contatoAtual.Nome = $("#inputNome").val();
        contatoAtual.Emails = $("#listaInputEmail").val().split(";");
        contatoAtual.Telefones = $("#listaInputTel").val().split(";");
    },

    validacaoContato: function () {
        var validacao = true;

        if ($("#inputNome").val() == "") {
            alert("Campo Nome obrigatório!")
            validacao = false;
        }

        if ($("#listaInputEmail").val() == "") {
            alert("É necessário adicionar pelo menos 1 email.")
            validacao = false;
        }

        if ($("#listaInputTel").val() == "") {
            alert("É necessário adicionar pelo menos 1 telefone.")
            validacao = false;
        }

        return validacao;
    }
}

window.agendaEvents = {

    onClickNovoContato: function () {
        idContato = 0;
        $('#modelContato').modal('show');
        window.agendaUi.limparModal();
        $("#btnExcluirContato").hide();
    },

    onClickEditarContato: function (id) {
        idContato = id;
        $('#modelContato').modal('show');
        window.agendaUi.limparModal();
        window.agendaUi.popularContatoModal();
    },

    onClickSalvarContato: function () {
        if (window.agendaFunctions.validacaoContato()) {
            window.agendaFunctions.popularObjetoContato();
            window.agendaFunctions.salvarContato();
        }
    },

    onClickDeletarContato: function () {
        if (confirm("Deseja realmente excluir o contato?")) {
            window.agendaFunctions.popularObjetoContato();
            window.agendaFunctions.deletarContato();
        }
    },

    onClickAddEmail: function () {

    },

    onClickAddTelefone: function () {

    }
}

$(document).ready(function () {
    window.agendaFunctions.init();
});