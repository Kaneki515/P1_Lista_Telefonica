$(document).ready(function () {
    $('.tabs').tabs();
    let codigo = 0;
    let listaContato = []; // Array para armazenar os contatos

    // adicionar
    $('#btn-add').click(function () {
        let contato = [];

        // let nome = $('#addNome').val();
        // let telefone = $('#addTelefone').val();
        // let telefoneEValido = checarTelefone(telefone);
        contato.codigo = codigo++;
        contato.nome = $('#addNome').val();
        contato.telefone = $('#addTelefone').val();
        let telefoneEValido = checarTelefone(contato.telefone);
        listaContato.push(contato);
        if (telefoneEValido) {
             // Adiciona o contato ao array

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
                                <td><a href="#"><i class="material-icons">delete_forever</i></a></td>
                        </tr>`;
            $('#lista').append(conteudo);
            $('#addNome, #addTelefone').val('');
            $('#addTelefone').removeClass('red');
        } else {
            $('#addTelefone').addClass('red');
        }
    });

});
