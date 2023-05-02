//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
var express = require('express'); 
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost'; 
var port = 3000; 

// Nous créons un objet de type Express. 
var app = express(); 

var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet myRouter, que nous allons implémenter les méthodes. 
var myRouter = express.Router(); 

myRouter.route('/players')
.get(function(req,res){ 
	  res.json({message : "Liste tous les players", methode : req.method});
})
.post(function(req,res){
    res.json({message : "Ajoute un nouveau player", 
    lastname : req.body.lastname, 
    firstname : req.body.firstname, 
    license : req.body.license,
    methode : req.method});
})
.put(function(req,res){ 
      res.json({message : "Mise à jour des informations d'un player", methode : req.method});
})
.delete(function(req,res){ 
res.json({message : "Suppression d'un player", methode : req.method});  
});


myRouter.route('/players/:player_id')
.get(function(req,res){ 
	  res.json({message : "Vous souhaitez accéder aux informations du player n°" + req.params.player_id});
})
.put(function(req,res){ 
	  res.json({message : "Vous souhaitez modifier les informations du player n°" + req.params.player_id});
})
.delete(function(req,res){ 
	  res.json({message : "Vous souhaitez supprimer le player n°" + req.params.player_id});
});


// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);  

// Démarrer le serveur 
app.listen(port, hostname, function(){
	console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port); 
});