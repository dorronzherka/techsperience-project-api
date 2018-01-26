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
mongoose.connect('mongodb://localhost/techsperienceProject')
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
	document_description =req.body.document_description
	doc.document_physicalLocation = req.body.document_physicalLocation
	doc.document_scannedImages = req.body.document_scannedImages;

	Document.create(doc,(err,doc) => {
		if(err)
			console.log(err);
		res.json(doc);
	});
});

// ------ Get All Documents ------
app.get('/documents',(req,res) => {
	//Code for handling  documents  to be returned as JSON
	Document.find((err,docs) => {
		if(err)
			console.log(err);
		res.json(docs);
	})
});

// ------ Get a Document By id ------
app.get('/documents/:id',(req,res) => {
	//Code for handling  to get  document by id
	Document.findById(req.params.id,(err , doc) => {
		if(err)
			console.log(err);
		res.json(doc);
	});
});

// ------ Update Document ------
app.put('/documents/update/:id',(req ,res) => {
	//Code for handling  to update document
	var updatedDocument = {
		document_number : req.body.document_number,
		document_title : req.body.document_title,
		document_description : req.body.document_description,
		document_physicalLocation : req.body.document_physicalLocation,
		document_scannedImages  : req.body.document_scannedImages
	}

	Document.findOneAndUpdate(
		{ 
			_id : req.params.id
		},
		updatedDocument,
		{
			new : true
		}, 
		(err,doc) =>{
			if(err)
				console.log(err);
			res.json(doc);
		}
	)
});

// ------ Remove Document ------
app.delete('/documents/delete/:id', (req,res) => {
	//Code for handling to remove a document
	Document.remove({ _id : req.params.id},(err , result) =>{
		if(err)
			console.log(err);
		res.json({ message : "Document has been deleted!"});
	})
});


// ------ Run ------
app.listen(3000,() => {
	console.log("Express server is runnig at => http://localhost:3000");
});