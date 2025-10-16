Repetir o exercício da aula anterior (Aula 6 Express) utilizando agora um Router.  Opcionalmente utilizar o express-generator para criar a estrutura básica.

<img width="752" height="428" alt="image" src="https://github.com/user-attachments/assets/4d497db8-120e-4544-9e77-b2b22559bff9" />
1. Criar uma função de Middleware para cada uma das rotas mostradas exibindo apenas uma página com
nome da rota
2. Criar uma função Middleware de aplicação que realiza o registro no console do acesso a cada página
(ver exemplos anteriores nesta aula)
3. Em signin , criar uma rota (/users/:userid) que recebe o userid do usuário e exibe na página uma msg
de boas vindas usando esse valor
4. Caso o usuário acesse sem userid é direcionado a página signup (pesquise como usar
res.redirect() )
5. Qualquer outra página que não tenha a rota indicada é direcionada para página de erro 404 com link
para o index (pesquise como usar res.status() )
