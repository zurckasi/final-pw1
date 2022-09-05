
const http = require("http");
const path = require("path");
const express = require("express");
const Favorito = require("./model/favorito");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();
app.use(express.json());

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/adicionar', (request, response) => {
    response.render('novo-favorito');
});

//adicionar novo favorito
app.post('/adicionar', (request, response) => {
    if (!request.body.titulo || !request.body.categoria || !request.body.link) {
      response.status(400).send("Os favoritos precisam de um titulo, categoria e link.");
      return;
    }
    const novo = new Favorito(request.body);
    novo
       .save()
       .then(() => {
         response.status(200).redirect("/");
       })
       .catch((err) => {
         response.status(400).send("Erro a salvar.");
       });
});

app.get("/", async function (request, response, next) {  
 await Favorito.find()
    .sort({ createdAt: "descending" })
    .exec(function (err, favoritos) {
      if (err) {
        return next(err);
      }
      response.render("index", { favoritos: favoritos });
    });
});

app.get("/findcat/:categoria", async function (request, response, next) {
  await Favorito.find({ categoria: request.params.categoria }, { __v: false })
    .sort({ createdAt: "descending" })
    .exec(function (err, favoritos) {
      if (err) {
        return next(err);
      }
      response.render("favbycat", { favoriteByCategory: favoritos });
    });
});

//roteador que recebe um parametro e busca a mensagem cujos detalhes devem ser exibidos
app.get('/detalhesdofavorito/:titulo', async function (request,response, next) {
    await Favorito.findOne({ titulo: request.params.titulo }, { __v: false })
    .exec(function (err, favorito) {
      if (err) {
        return next(err);
      }
      response.render("detalhes", { favorito: favorito });
    });
})

app.use((request, response) => {
    response.status(404).render('404');
});

app.listen(port ,() => {
  console.log(`API rodando na porta 3000`);
});
