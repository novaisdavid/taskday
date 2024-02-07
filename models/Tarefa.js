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

      estado:{
          type: String,
          required: false,
      }
})

mongoose.model('tarefas',Tarefa)