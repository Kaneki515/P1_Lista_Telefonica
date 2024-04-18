$(document).ready(function () {
    $('.tabs').tabs();

    let codigo = 0;
    let listaContato = []; // Array para armazenar os contatos

    // Função para verificar se o telefone possui pelo menos nove caracteres
    function checarTelefone(telefone) {
        return telefone.length >= 9;
    }

    // Funcionalidade 1 - Adicionar um registro
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

    // Funcionalidade 2 - Atualizar um registro parte 1
    $('#lista').on('click', '.btn-edit', function () {
        let row = $(this).closest('tr');
        let codigoAtual = row.find('.tCodigo').text();

        $('#upId').val(codigoAtual);
        $('#upNome').val(row.find('.tNome').text());
        $('#upTelefone').val(row.find('.tTelefone').text());
        $('.tabs').tabs('select', 'up');

        // Encontrar o contato correspondente na lista de contatos
        let upContatoIndex = listaContato.findIndex(contato => contato.codigo === parseInt(codigoAtual));
        let upContato = listaContato[upContatoIndex];

        // Funcionalidade 3 - Atualizar um registro parte 2
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

                // Atualizar os valores no array listaContato
                listaContato[upContatoIndex] = upContato;
            } else {
                $('#upTelefone').addClass('red');
            }
        });
    });

    // Funcionalidade 4 - Excluir um registro
    $('#lista').on('click', '.btn-del', function () {
        let row = $(this).closest('tr');
        let codigoAtual = row.find('.tCodigo').text();

        let delContatoIndex = listaContato.findIndex(contato => contato.codigo == codigoAtual);
        // Verifica se o contato foi encontrado na lista
        listaContato.splice(delContatoIndex, 1); // Remove o contato encontrado
        row.remove();
        console.log("Contato removido:", listaContato); // Exibe a lista de contatos atualizada no console
    });

    // Funcionalidade 5 - Procurar um registro
    $('#btn-find').click(function () {
        let nomePesquisa = $('#findNome').val().toLowerCase(); // Convertendo para minúsculas para uma comparação de caso insensível
    
        $('#lista tr').each(function () { 
            let nomeContato = $(this).find('.tNome').text().toLowerCase(); // Obtendo o nome do contato na linha atual
    
            if (nomeContato === nomePesquisa) { // Verificando se o nome do contato é igual ao termo de pesquisa
                $(this).show(); // Exibindo a linha se houver correspondência
            } else {
                $(this).hide(); // Ocultando a linha se não houver correspondência
            }
        });
    });

    // Funcionalidade 6 - Mostrar um registro
    $('#btn-show-all').click(function () {
        $('#findNome').val(''); // Limpar o campo de pesquisa
        $('#lista tr').show(); // Exibir todas as linhas da tabela
    });
});
