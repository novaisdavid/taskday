const express = require('express')
const app = express()
const path = require("path")
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt  = require('bcryptjs')
//const passport = require('./config/passport-config')
const flash  = require("connect-flash")
const mongoose = require('mongoose')
require('./models/Titulo')
const Titulo = mongoose.model('titulos')
require('./models/Tarefa')
const Tarefa = mongoose.model('tarefas')
require('./models/Usuario')
const Usuario = mongoose.model('usuarios')
let titulos_tarefas = []
const port =8090
const passport = require('passport')
require('./config/passport-config')(passport)
const {eUsuario} = require('./helpers/eUsuario')

// configurações

//configurar sessão
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'Kicun@da', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

app.use( (req, res, next)=>{
    res.locals.msg_sucesso = req.flash("msg_sucesso")
    res.locals.msg_erro    = req.flash("msg_erro")
    res.locals.error       = req.flash("error")
    res.locals.user        = req.user || null
    next()

  })

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

//rotas de login e logout
app.get('/taskday/login',(req,res)=>{
    res.render('usuarios/login')
})

app.post('/taskday/login',(req,res, next)=>{
    //console.log("O USUARIO: "+req.user )
    passport.authenticate("local", {
        successRedirect: "/taskday",
        failureRedirect: "/taskday/login",
        failureFlash: true
    })(req, res, next)

})

app.get('/taskday/logout',(req,res)=>{
    req.logout((s)=>{
        res.redirect('/taskday');
    });
    
})

//rotas para aplicação
app.get('/taskday/criartarefa', eUsuario, (req,res)=>{
    res.render('usuarios/criar_tarefa')
})


app.post('/taskday/criartarefa/creating',(req,res)=>{

    if(req.body.nome_tarefa==null || req.body.nome_tarefa== undefined || req.body.nome_tarefa==''||
    req.body.itens==null || req.body.itens== undefined || req.body.itens==''){
      
       req.flash("msg_erro","Erro ao criar a tarefa 😥, tente novamente!");
       res.redirect("/taskday/criartarefa");

    }else{
        const novoTitulo ={
               titulo:req.body.nome_tarefa
        }

        new Titulo(novoTitulo).save().then(()=>{
            var itens = req.body.itens || []
            var item_resultante = itens.toString().split(",")
            
            const novaTarefa = {
                tarefa:"",
                titulo: "",
                estado: false,
            }

            if(item_resultante == null || item_resultante == undefined || item_resultante == ""){
                req.flash("msg_erro","Erro ao criar a tarefa 😥, tente novamente!")
                res.redirect('/taskday/criartarefa')
            } 
            
            if(item_resultante==req.body.itens){

                novaTarefa.tarefa = req.body.itens
                novaTarefa.titulo = req.body.nome_tarefa
                titulos_tarefas.push({ titulo:req.body.nome_tarefa})

            }else if(!(item_resultante==req.body.itens)){
                let elemento = ""
                for (let index = 0; index < item_resultante.length; index++) {
                    elemento   = elemento.toString() + "," + item_resultante[index].toString();
                }

                novaTarefa.tarefa = elemento.substring(1)
                novaTarefa.titulo = req.body.nome_tarefa
                titulos_tarefas.push({ titulo:req.body.nome_tarefa})
            }

            new Tarefa(novaTarefa).save().then(()=>{
                re.flash("msg_sucesso","Tarefa Criada com Sucesso!")
                res.redirect("/taskday/vertarefascriadas");
            }).catch((erro)=>{
                req.flash("msg_erro","Tarefa Não criada, por favor reveja todos os campos!")
                res.redirect("/taskday/criartarefa");    
            })

            
        }).catch((erro)=>{
            req.flash("msg_erro","Algo correu mal, por favor tente novamente!")
            res.redirect("/taskday/criartarefa");
        })
    }
    
})

app.get('/taskday/vertarefascriadas', eUsuario, (req,res)=>{
    Tarefa.find().lean().then( (tarefas)=>{
       let novaTarefa = []

        for (let index = 0; index < tarefas.length; index++) {
            novaTarefa.push({
                titulo:tarefas[index].titulo,
                tarefa:tarefas[index].tarefa.split(','),
                estado: false,
            } )
            
        }
        
        res.render('usuarios/tarefas_criadas',{tarefas: novaTarefa})
    }).catch((erro)=>{
        req,flash("msg_erro","Erro ao Exibir as tarefas por favor tente novamente!")
        res.redirect("/taskday");
    })
    
})

app.get('/taskday/criarconta',(req,res)=>{
    res.render('usuarios/criarConta')
})


app.post('/taskday/creatinguser',(req,res)=>{

    if(req.body.nome_usuario==null || req.body.nome_usuario==undefined ||
        req.body.email==null || req.body.email==undefined ||
        req.body.passe==null || req.body.passe==undefined ||
        req.body.nome_usuario=="" || req.body.email=="" ||
        req.body.pass==""){

            req.flash('msg_erro','Erro ao Criar Conta 😥, Por favor preencha correctamente os campos! ')
            res.redirect('/taskday/criarconta')
    }else if(req.body.nome_usuario!=null && req.body.nome_usuario!=undefined &&
        req.body.email!=null && req.body.email!=undefined &&
        req.body.passe!=null && req.body.passe!=undefined &&
        req.body.nome_usuario!="" && req.body.email!="" &&
        req.body.passe!=""){
           
        const novoUsuario = new Usuario({
            nome: req.body.nome_usuario,
            email: req.body.email,
            password: req.body.passe
    
        })

        bcrypt.genSalt(10,(erro,salt)=>{
            bcrypt.hash(novoUsuario.password, salt, (erro,hash)=>{
                
                if(erro){
                    req.flash("msg_erro","Erro durante o salvamento")
                    res.redirect('/taskday/criarconta')
                }
    
                novoUsuario.password = hash
                novoUsuario.save().then( ()=>{
                    req.flash('msg_sucesso','Usuário Registado Com Sucesso! Por favor faça o login')
                    res.redirect('/taskday/login')
    
                }).catch( (erro)=>{
                    req.flash('msg_erro','Erro ao Criar Conta, Por favor tente Novamente! 😥')
                    res.redirect('/taskday/criarconta')
                })
            })
        })
       
    }
    
    
})

/*const hostIp = '192.168.145.15';
// porta onde irá rodar a aplicação
app.listen(port,hostIp,function(){
    console.log('SERVER UP! http://:',hostIp,':',port)
})*/

app.listen(port,function(){
    console.log('SERVER UP! http://:localhost',port)
})