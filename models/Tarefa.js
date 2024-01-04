const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tarefa = new Schema({
      tarefa:{
          type: String,
          required: true
      }
})

mongoose.model('tarefas',Tarefa)