// ------ Requiring packages ------
const express =  require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');


// ------ Requiring Document Model( Schema ) ------
const Document = require('./models/Document.js');

// ------ Initialize Express App ------
const app = express();

// ------ Body-Parser Middleware ------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


// ------ Connecting database with Mongoose ------
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/techsperienceProject',{useMongoClient : true})
	.then(() =>{
		console.log("Successfully connected to MongoDB! :)");	
	}).catch(err => {
		console.error(err);
	});

// ------ Routes ------

// ---- Index Page ----
app.get('/',(req,res) => {
	res.send("Welcome  To Techsperience Prototype Project API");
});

// ------ Create Document ------
app.post('/documents',(req,res) => {
	//Code for handling creation  of document in MongoDB
	var doc = new Document();
	doc.document_number = req.body.document_number;
	doc.document_title = req.body.document_title;
	doc.document_physicalLocation = req.body.document_physicalLocation
	doc.document_scannedImages = req.body.document_scannedImages;

	Document.create(doc,(err,doc) => {
		if(err)
			console.log(err);
		res.json(doc);
	});
});


// ------ Run ------
app.listen(3000,() => {
	console.log("Express server is runnig at => http://localhost:3000");
});