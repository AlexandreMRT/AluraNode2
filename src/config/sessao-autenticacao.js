const uuid = require('uuid/v4');
const sessao = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usuarioDao = require('../app/infra/usuario-dao');
const db = require('./database');

module.exports = (app) => {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'senha'
    },
    (email, senha, done) => {
      const usuarioDao = new usuarioDao(db);
      usuarioDao.buscaPorEmail(email)
                .then(usuario => {
                  if(!usuario || senha != usuario.senha) {
                    return done(null, false, {
                      mensagem: 'Login e senha incorretos!'
                    });
                  }
                  return done(null, usuario);
                })
                .catch(erro => done(erro, false));
    }
  ));

    passport.serializeUser((usuario, done) => {
      const usuarioSessao = {
        nome: usuario.nome_completo,
        email: usuario.email
      };
      done(null, usuarioSessao);
    });

    passport.deserializeUser((usuarioSessao, done) => {
      done(null, usuarioSessao);
    })

    app.use(sessao({
      secret: 'node alura',//string aleatoria
      genId: function(req) {
        return uuid(); 
      },
      resave: false,
      saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

}