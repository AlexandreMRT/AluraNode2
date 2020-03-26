const { check, validationResult } = require('express-validator/check');
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

const LivroControlador = require('../controladores/livro-contolador');

const livroControlador = new LivroControlador();

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/base/home/home.marko')
        );
    });
    
    app.get('/livros', livroControlador.lista());

    app.get('/livros/form', livroControlador.formularioCadastro());

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
                .then(livro => 
                    resp.marko(
                        require('../views/livros/form/form.marko'), 
                        { livro: livro }
                    )
                )
                .catch(erro => console.log(erro));
    });

    app.post('/livros', [
        check('titulo').isLength({ min: 5 }).withMessage(' titulo precisa ter no minimo 5 caracteres.'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetario valido!')
    ], livroControlador.cadatra());

    app.put('/livros', livroControlador.formularioEdicao());

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
    });
};