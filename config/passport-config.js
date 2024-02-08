const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

require('../models/Usuario')
const usuario = mongoose.model('usuarios')

module.exports = function(passport){

  passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'passe'},
    function(email, passe, done) {
      // Implemente a lógica de autenticação aqui
      usuario.findOne({email: email}).then( (usuario)=>{
        
        if(!usuario){
          return done(null, false, {message: "Usuário não encontrado!"})
        }

        bcrypt.compare(passe, usuario.password, (erro, sucesso)=>{
         
          if(sucesso){
            return done(null,usuario)

          }else{
            return done(null, false, {message: "senha incorrecta!"})
          }
        })
      })

     
    }
  ));
  
  passport.serializeUser(function(usuario, done) {
    done(null, usuario.nome);
  });
  
  /*passport.deserializeUser(function(_id, done) {
    // Recupere o usuário do banco de dados usando o ID
    usuario.findById(_id, (erro, usuario)=>{
      done(null,usuario);
    })
    
  });*/

  passport.deserializeUser(function(nome, done) {
    // Recupere o usuário do banco de dados usando o ID
    done(null, { nome: nome});
  });
  
}

//module.exports = passport;
