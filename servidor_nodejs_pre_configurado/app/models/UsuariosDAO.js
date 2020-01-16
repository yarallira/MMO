function UsuariosDAO(connection){
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.insert(usuario);

            mongoclient.close();
    });
});
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){
            collection.find({usuario: {$eq: usuario.usuario}, senha: {$eq: usuario.senha}}).toArray(function(err, result){

    if(result[0] != undefined){
        req.session.autorizado = true

        req.session.usuario = result[0].usuario;
        req.session.casa = result[0].casa;
        }else{
            req.session.autorizado = false
        }

        if(req.session.autorizado){
            res.redirect("jogo");
            console.log(result);
            console.log(req.session.autorizado);
        }else{
            res.render('index', {validacao: {}});
            console.log(result);
            console.log(req.session.autorizado);
        }

     });

    mongoclient.close();
    });
})
}

module.exports = function(){
    return UsuariosDAO;
}