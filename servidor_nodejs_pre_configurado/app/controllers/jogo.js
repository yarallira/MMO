module.exports.jogo = function(application , req, res){
    
    if(req.session.autorizado !== true){
        res.send('Usuário precisa fazer login');
        return;
    }
    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(res, usuario);  

}

module.exports.sair = function(application , req, res , casa){
    
  req.session.destroy( function(err){
      res.render("index", {validacao: {}});
  })

}