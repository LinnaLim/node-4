const express = require('express');
const app = express();
const fs = require('fs');

const transforme_en_tableau = (membres) => {
	let htmlMembres = "<DOCTYPE html>"
	htmlMembres += "<head>";
	htmlMembres += "<meta charset='utf-8'>";
	htmlMembres += "</head>";
	htmlMembres += "<body>";
	htmlMembres += "<h1>Les Provinces du Canada</h1>";
	htmlMembres = "<table>";
	htmlMembres += "<tr>";
    htmlMembres += "<th>Prénoms</th>";
    htmlMembres += "<th>Noms</th>";
    htmlMembres += "<th>Téléphones</th>";
    htmlMembres += "<th>Courriels</th>";
    htmlMembres += "</tr>";

	for(elm of membres){
		htmlMembres+= "<tr>";
		htmlMembres+= "<td>" + elm.prenom +"</td>";
		htmlMembres+= "<td>" + elm.nom +"</td>";
		htmlMembres+= "<td>" + elm.telephone +"</td>";
		htmlMembres+= "<td>" + elm.courriel +"</td>";
		htmlMembres+= "</tr>";
		// for (var p in elm){
		// 	htmlMembres+= "<tr>";
		// 	htmlMembres+= "<td>" + p +"</td>";
		// 	htmlMembres+= "<td>" + membres[p] +"</td>";
		// 	htmlMembres+= "</tr>";
		// }
	}


	htmlMembres +="</table>";
	htmlMembres += "</body>";
	htmlMembres +="</html>" 

	return htmlMembres;
}


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

	//console.log(reponse);
	res.end(JSON.stringify(reponse));

	fs.readFile('public/data/membres.json', 'utf8', function (err, data) {
		if (err) throw err;
		let membres = JSON.parse(data);
		membres.push(reponse);
		
		//console.log(membres);

		fs.writeFile('public/data/membres.json', JSON.stringify(membres), (err) => {
			if (err) throw err;
		});
	});

	

});

///////////////////////////////////////////////////// Route /membres
app.get('/membres', (req, res)=>{

	fs.readFile('public/data/membres.json', 'utf8', function (err, data) {
		if (err) throw err;
		let membres = JSON.parse(data);
		res.end(transforme_en_tableau(membres))
	});


});

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	 
	console.log("Exemple l'application écoute sur http://%s:%s", host, port);

});