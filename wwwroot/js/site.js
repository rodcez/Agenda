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

        $("#inputNome").val(contato[0].nome);
        $("#listaInputEmail").text(contato[0].emails.toString());
        $("#listaInputTel").text(contato[0].telefones.toString());

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

            var buttonEditar = '<button type="button" class="btn btn-dark" data-toggle="modal" data-target="#modelContato" onclick="window.agendaEvents.onClickEditarContato(' + contato.idContato + ')">Editar</button>';

            $('#tableContatos > tbody').append(
                '<tr id="idContatoGrid_' + contato.idContato + '">' +
                '   <td>' + contato.nome + '</td>' +
                '   <td>' + contato.emails.toString().replace(/(.{30})..+/, "$1…") + '</td>' +
                '   <td>' + contato.telefones.toString().replace(/(.{30})..+/, "$1…") + '</td>' +
                '   <td>' + buttonEditar + '</td>' +
                '</tr> ');
        });

        window.agendaUi.aplicarEstruturaTable();
    },

    aplicarEstruturaTable: function () {
        $('#tableContatos').DataTable({
            "language": {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Filtrar: &nbsp;",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                },
                "select": {
                    "rows": {
                        "_": "Selecionado %d linhas",
                        "0": "Nenhuma linha selecionada",
                        "1": "Selecionado 1 linha"
                    }
                }
            }
        });
    },

    limparModal: function () {
        $("#inputNome").val("");

        $("#listaInputEmail").text("");
        $("#inputEmail").val("");

        $("#listaInputTel").text("");
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
            success: function () {
                listaContato.push(contatoAtual);
                window.agendaUi.popularGridContatos();
                alert("Contato adicionado com sucesso!");
                $('#modelContato').modal('hide');
                callback && callback();
            },
            error: function () {
                alert("Erro ao salvar o contato!");
            },
            data: JSON.stringify({
                Contato: contatoAtual
            })
        })
    },

    obterListaContato: function (callback) {
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
                alert("Erro ao obter a lista de contatos!");
            }
        })
    },

    deletarContato: function (callback) {
        var contato = listaContato.filter(function (c) {
            return c.idContato == idContato;
        });

        if (contato.length >= 0) {
            $.ajax({
                url: '/Agenda/DeletarContato/' + contato[0].idContato,
                type: 'get',
                contentType: "application/json",
                success: function (data) {
                    listaContato.splice(listaContato.indexOf(contato[0]), 1);
                    window.agendaUi.popularGridContatos();
                    alert("Contato deletado com sucesso!");
                    $('#modelContato').modal('hide');
                    callback && callback();
                },
                error: function (data) {
                    alert("Erro ao deletar o contato!");
                }
            })
        }
    },

    popularObjetoContato: function () {
        contatoAtual = {};
        contatoAtual.idContato = listaContato.length + 1;
        contatoAtual.nome = $("#inputNome").val();
        contatoAtual.emails = $("#listaInputEmail").text().split(",");
        contatoAtual.telefones = $("#listaInputTel").text().split(",");
    },

    validacaoContato: function () {
        var validacao = true;

        if ($("#inputNome").val() == "") {
            alert("Campo Nome obrigatório!")
            validacao = false;
        }

        if ($("#listaInputEmail").text() == "") {
            alert("É necessário adicionar pelo menos 1 email.")
            validacao = false;
        }

        if ($("#listaInputTel").text() == "") {
            alert("É necessário adicionar pelo menos 1 telefone.")
            validacao = false;
        }

        return validacao;
    },

    addEmailNaLista: function () {
        var listaEmail = $("#listaInputEmail").text() + $("#inputEmail").val() + ",";

        $("#listaInputEmail").text(listaEmail);
        $("#inputEmail").val("");
    },

    addTelefoneNaLista: function () {
        var listaTelefone = $("#listaInputTel").text() + $("#inputTel").val() + ",";

        $("#listaInputTel").text(listaTelefone);
        $("#inputTel").val("");
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
        window.agendaFunctions.addEmailNaLista();
    },

    onClickAddTelefone: function () {
        window.agendaFunctions.addTelefoneNaLista();
    }
}

$(document).ready(function () {
    window.agendaFunctions.init();
});