const { check, validationResult } = require('express-validator/check');
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

const LivroControlador = require('../controladores/livro-contolador');
const livroControlador = new LivroControlador();

const BaseControlador = require('../controladores/base-controlador');
const baseControlador = new BaseControlador();

module.exports = (app) => {
    app.get('/', baseControlador.home());
    
    app.get('/livros', livroControlador.lista());

    app.get('/livros/form', livroControlador.formularioCadastro());

    app.get('/livros/form/:id', livroControlador.formularioEdicao());

    app.post('/livros', [
        check('titulo').isLength({ min: 5 }).withMessage(' titulo precisa ter no minimo 5 caracteres.'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor monetario valido!')
    ], livroControlador.cadatra());

    app.put('/livros', livroControlador.edita());

    app.delete('/livros/:id', livroControlador.remove());
};