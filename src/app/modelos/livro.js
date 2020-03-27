const { check, validationResult } = require('express-validator/check');

class Livro {
  static validacoes(){
    return [
      check('titulo').isLength({ min: 5 }).withMessage(' titulo precisa ter no minimo 5 caracteres.'),
      check('preco').isCurrency().withMessage('O preço precisa ter um valor monetario valido!')
    ];
  }
}

module.exports = Livro;