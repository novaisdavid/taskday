const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tarefa = new Schema({
      tarefa:{
          type: String,
          required: true
      },

      titulo:{
          type: String,
          ref: "titulos",
          required: true
      },

      nomeUsuario:{
        type: String,
        ref: "usuarios",
        required: true
    },
      estado:{
          type: Number,
          required: false,
      }
})

mongoose.model('tarefas',Tarefa)