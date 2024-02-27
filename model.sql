usuario=
id, nome, email,senha, [generos], [autores], [titulos], username, bio, imagemUrl, criadoEm, atualizadoEm

livro=
id, nome, idLivro, genero, sinopse, imagemUrl, somaAvalição, ContadorAvalições, mediaAvaliação criadoEm, atualizadoEm, editora, anoDePublicação

comentarios=
id, idLivro, idUsuario, texto, criadoEm, atualizadoEm, notaLivro

genero=
id, nome

autores
id, nome, [genero], img, resumoCarreira, localNascimento, criadoEm, atualizadoEm

pensamento
id, frase, idAutor, nomeDoAutor, criadoEm, atualizadoEm