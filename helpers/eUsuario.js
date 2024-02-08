module.exports = {
    eUsuario: function(req, res, next){

        if(req.isAuthenticated()){
            return next()

        }

        req.flash("msg_erro","Não estás auntencicado, por favor crie uma conta!");
        res.redirect("/taskday/criarconta");
    }
}