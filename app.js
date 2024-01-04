const express = require('express')
const app = express()
const path = require("path")
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
//const session = require("express-session")
//const flash  = require("connect-flash")
const mongoose = require('mongoose')
require('./models/Titulo')
const Titulo = mongoose.model('titulos')
require('./models/Tarefa')
const Tarefa = mongoose.model('tarefas')
const port =8090

// configurações
//configurar sessão
/*app.use(session({
    secret: "Kicun@da",
    resave: true,
    saveUninitialized: true

 }))
 //configuracao da auntenticacao
 app.use(passport.initialize())
 app.use(passport.session())
 app.use(flash())
  // middleware e variaveis globais
app.use( (req, res, next)=>{
    res.locals.msg_sucesso = req.flash("msg_sucesso")
    res.locals.msg_erro    = req.flash("msg_erro")
    next()

  })*/
  //handlebars(tamplate)
  //body-parser
  app.engine('handlebars',handlebars.engine({defaultLayoute: 'main'}))
  app.set('view engine','handlebars')

  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

   //mongoose
   mongoose.connect("mongodb://127.0.0.1/taskday",{
    }).then(
         ()=>{
            console.log("CONNECT MONGODB UP!")
           }
     ).catch(
         (erro)=>{
              console.log("CONNECT MONGODB ERROR: ",erro)
             }
       )

       //public
  app.use(express.static(path.join(__dirname,"public")))

//rotas para aplicação
app.get('/taskday',(req,res)=>{
    res.render('usuarios/index')
})

//rotas para aplicação
app.get('/taskday/criartarefa',(req,res)=>{
    res.render('usuarios/criar_tarefa')
})

app.get('/taskday/vertarefascriadas',(req,res)=>{
    res.render('usuarios/tarefas_criadas')
})

app.post('/taskday/criartarefa/creating',(req,res)=>{

    if(req.body.nome_tarefa==null || req.body.nome_tarefa== undefined || req.body.nome_tarefa==''||
    req.body.itens==null || req.body.itens== undefined || req.body.itens==''){
        res.render('usuarios/index')
    }else{
        const novoTitulo ={
               titulo:req.body.nome_tarefa
        }

        new Titulo(novoTitulo).save().then(()=>{
            var itens = req.body.itens
            res.send("ites do vector: "+ itens)
            //res.send("Titulo da Tarefa Criada com Sucesso!")
        }).catch((erro)=>{
            res.send("erro ao criar o titulo da tarefa: "+ erro)
        })
    }
//    res.send('o que entrou: '+req.body.nome_tarefa+' itens: '+req.body.itens)
    
})

// porta onde irá rodar a aplicação
app.listen(port,function(){
    console.log('SERVER UP! port:',port)
})