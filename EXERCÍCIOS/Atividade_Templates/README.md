Criar um projeto para implementar o exercício final da Aula 7, utilizando o Express Generator e Templates EJS. Criar um pequeno conteúdo para cada rota especificada no exercício.

  01- Utilizando o express em conjunto com express generator , explore as possibilidades da utilização de um router.
1. Crie o diretório e inicie uma nova aplicação ( npm init )
2. Instale os módulos express e express generator ( npm install express express generator )
3. Use o express-generator para criar a estrutura no diretório criado em 1. ( npx express generator view=ejs [DIRETORIO_CRIADO] )
4. Observe que já existem duas rotas: / e /users
5. Acrescentar as rotas /news e /about fazendo os ajustes necessários em app.js
6. Criar os respectivos arquivos de rotas em /routes ( news.js e about.js )
1. Siga o mesmo padrão do arquivo users.js
7. Modificar a mensagem 'respond with a resource' para uma mensagem de texto apenas informando o
nome da página que está sendo acessada (users, news ou about)
8. Modifique o valor da variável title em /route/index.js . O que acontece?
9. Teste todas as rotas

   02- Utilizando o express e o express generator , crie um mini site estático.
1. Utilize os arquivos disponibilizados na Aula 7
   - index.html , style.css e laptop from above.jpg
2. Rodar aplicação ( npm start )
  - A figura foi carregada? E a folha de estilos?
  - Faça os ajustes em index.html
3. Adicione uma segunda página ( mybedroom.html )
  - Crie o arquivo HTML com algum conteúdo
  - Modifique index.html acrescentando um link para mybedroom.html

    03- 3 (Atividade Router)
Refazer o exercício da Aula 6 (Express) utilizando agora um router .
Opcionalmente utilizar o express generator para criar a estrutura básica.
