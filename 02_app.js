const express = require('express');
const app = express();
const fs = require('fs');




app.use(express.static('public'));
///////////////////////////////////////////////////// Route /formulaire
app.get('/formulaire', function (req, res) {
	console.log(__dirname);
	res.sendFile( __dirname + "/public/html/" + "01_form.htm" );
})
/////////////////////////////////////////////////// Route /
app.get('/', (req, res) => {
	console.log('accueil')
	res.sendFile( __dirname + "/public/html/" + "index.htm" );
})
/////////////////////////////////////////////////// Route /traiter_get
app.get('/traiter_get', (req, res) =>{
	// Preparer l'output en format JSON

	console.log('la route /traiter_get')

	// on utilise l'objet req.query pour récupérer les données GET
	let reponse = {
		prenom:req.query.prenom,
		nom:req.query.nom,
		telephone:req.query.telephone,
		courriel:req.query.courriel
	};

	console.log(reponse);
	res.end(JSON.stringify(reponse));

	fs.readFile('public/data/membres.json', 'utf8', function (err, data) {
		if (err) throw err;
		let membres = JSON.parse(data);
		membres.push(reponse);
		
		console.log(membres);

		fs.writeFile('public/data/membres.json', JSON.stringify(membres), (err) => {
			if (err) throw err;
		});
	});

	

});
///////////////////////////////////////////////////// Route /membres
app.get('/membres', (req, res)=>{
	
});

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	 
	console.log("Exemple l'application écoute sur http://%s:%s", host, port);

});