function JogoDAO(connection){
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("jogo", function(err, collection){
            collection.insert({
                usuario : usuario,
                moeda: 15,
                suditos: 10, 
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });

            mongoclient.close();
    });
    });
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, comando_invalido){
    this._connection.open( function(err, mongoclient){
        mongoclient.collection("jogo", function(err, collection){
        collection.find({usuario: usuario}).toArray(function(err, result){

        res.render("jogo", {img_casa: casa, jogo: result[0], comando_invalido : comando_invalido});

        mongoclient.close();

            });     
        });
    })
}

module.exports = function(){
    return JogoDAO;
}