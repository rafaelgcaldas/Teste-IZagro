# Teste IZagro

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 6.2.2.

## Executar

Para executar esta aplicação é necessário seguir os seguintes passos.

Instalar o Json Server
npm install -g json-server

- Execute o seguinte comando em um interpretador de linhas de comando qualquer, no diretório onde o a arquivo "banco-de-dados.json" está presente (diretório raiz da aplicação) `json-server --watch banco-de-dados.json`
O json-server ocupará o porta 3000.
Observação: Este arquivo é responsável por salvar os dados gerencioados pelo Json-Server.

- Antes de executar a API Node.js, execute o comando "npm install", para instalar as dependências. a api de e-mail ocupará a porta 3001.
Observação: Para enviar e-mail é necessáio inserir o e-mail e senha, com o qual deseja enviar os e-emails nos respectivos atributos -> (auth.user e auth.pass) no arquivos api\email\email.js

- Execute o comando "npm install", para instalar as dependências.
- Execute `ng serve` e navegue para `http://localhost:4200/`.

Neste teste foi desenvolvido as seguintes solitações :

## Banner Flutuante

Foi desenvolvido utilizando o aproach BrowserAnimationsModule. Assim que a aplicação é carregada no browser,
surge um pequeno banner "Cadastre-se aqui", ao clicar sobre o mesmo surge um formulário possibilitando o cadastro do usuário. Uma vez cadastrado, os dados do usuário são salvos, e um e-mail informando o sucesso do cadastro é enviado ao usuário por meio de uma api Node.js. É possível listar todos os usuários cadastrados pelo banner na opção de menu "Administrativo" na Tab "Usuários".

## Carrossel (Home) e um administrativo (CRUD)

Foi desenvolvido um carrossel utilizando como base o componente Carousel do bootstrap, assim como um painel administrativo possibilitando o gerenciamento do mesmo. Assim que a aplicação é carregada o carrossel ficará visível na pagina home com as imagens, descrição e um botão de redirecionamento para a oferta em questão. Todos esses dados são gerenciados pleo painel administrativo. Para acessar o painel, basta acessar a opção de menu "Administrativo" contida no cabeçalho da aplicação. Assim que acessada essa opção, é carregada um componete nav do bootstrap. Na tab "Banners", será listado os banners salvos, podendo excluir, atualizar e adicionar novos banners, sendo possível também marcar qual será o banner que será o primeiro a ser exibido assim que a home é carregada.
Na tab "Usuarios" serão listados todos os usuarios cadastrados pelo banner flutuante.
Observação:  De ínicio a aplicação possui dois banners cadastrados, mas é possivel adicionar a quantidade que preferir.

## Opção de menu Sementes

Apenas para ilustrar o contexto da aplicação, nesta opção de menu, serão listados todas as ofertas de sementes cadastradas na aplicação.

## Página 
Também para iluastrar o contexto da aplicação, a página home possui o Carrossel, as ofertas de sementes em destaque e um campo de pesquisa de oferta no cabeçalho, sendo possível filtrar as ofertas pelo título e ser redirecionado para a oferta ao clicar sobre o resultado da pesquisa.

## Back-end
No back-end foi utilizado o Json Server `https://www.npmjs.com/package/json-server`, cuja a função é simular uma API REST e manter os dados gerados pela applicação no arquivo banco-de-dados.json, simulando um banco de dados não relacional.
Também foi desenvolvida uma API para o envio de e-mails utilizando o Node.js e o módulo Nodemailer.

OBSERVAÇÃO
Todo o conteúdo, como imagens e informações foram retirados do site `www.izagro.com.br`, de forma a ilustrar a aplicação, possuíndo semântica meramente ilustrativa.
