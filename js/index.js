$(document).ready(function () {
    $('.tabs').tabs();

    let codigo = 0;
    let listaContato = []; // Array para armazenar os contatos

    // adicionar
    $('#btn-add').click(function () {
        let contato = {}; // Cria um novo objeto contato a cada vez que um novo contato é adicionado

        contato.nome = $('#addNome').val();
        contato.telefone = $('#addTelefone').val();
        let telefoneEValido = checarTelefone(contato.telefone);

        if (telefoneEValido) {
            contato.codigo = codigo++;

            listaContato.push(contato);

            console.log(contato);
            //inclusao na tabela
            let conteudo = `<tr>
                                <td class="tCodigo">${contato.codigo}</td>
                                <td class="tNome">${contato.nome}</td>
                                <td class="tTelefone">${contato.telefone}</td>
                                <td>
                                    <a href="#" class="btn-edit">
                                        <i class="material-icons">edit</i>
                                    </a>
                                </td>
                                <td>
                                    <a href="#" class="btn-del">
                                        <i class="material-icons">delete_forever</i>
                                    </a>
                                </td>
                        </tr>`;
            $('#lista').append(conteudo);
            $('#addNome, #addTelefone').val('');
            $('#addTelefone').removeClass('red');
        } else {
            $('#addTelefone').addClass('red');
        }
    });

    //Update
    $('#lista').on('click', '.btn-edit', function () {
        let row = $(this).closest('tr'); // Obtém a linha clicada 
        let codigoAtual = row.find('.tCodigo').text(); // Obtém o texto do elemento com classe 'tCodigo' dentro da linha
        let nomeAtual = row.find('.tNome').text(); // Obtém o texto do elemento com classe 'tNome' dentro da linha
        let telefoneAtual = row.find('.tTelefone').text(); // Obtém o texto do elemento com classe 'tTelefone' dentro da linha

        $('#upId').val(codigoAtual);
        $('#upNome').val(nomeAtual);
        $('#upTelefone').val(telefoneAtual);
        $('.tabs').tabs('select', 'up');

        // Encontrar o contato correspondente na lista de contatos
        let upContato = listaContato.find(contato => contato.codigo === parseInt(codigoAtual));
        // Atualizar o objeto contato ao editar
        $('#btn-up').off('click').on('click', function () {
            let novoNome = $('#upNome').val();
            let novoTelefone = $('#upTelefone').val();

            let telefoneEValido = checarTelefone(novoTelefone);

            if (telefoneEValido) {
                // Atualizar os dados do contato específico
                upContato.nome = novoNome;
                upContato.telefone = novoTelefone;

                // Atualizar a tabela
                row.find('.tNome').text(novoNome);
                row.find('.tTelefone').text(novoTelefone);
                $('#upTelefone').removeClass('red');
            } else {
                $('#upTelefone').addClass('red');
            }
        });
    });
});
