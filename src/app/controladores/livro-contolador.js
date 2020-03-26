const { validationResult } = require('express-validator/check');
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');


class LivroControlador {
  lista() {
    return function(req, resp) {

      const livroDao = new LivroDao(db);
      livroDao.lista()
              .then(livros => resp.marko(
                require('../views/livros/lista/lista.marko'),
                {
                  livros: livros
                }
              ))
              .catch(erro => console.log(erro));
    };
  }

  formularioCadastro() {
    return function(req, resp) {
      resp.marko(
          require('../views/livros/form/form.marko'),
          { livro: {} });
    }
  }

  formularioEdicao() {
    return function(req, resp) {
      const livroDao = new LivroDao(db);

      livroDao.atualiza(req.body)
              .then(resp.redirect('/livros'))
              .catch(erro => console.log(erro));
    }
  }






}

module.exports = LivroControlador;