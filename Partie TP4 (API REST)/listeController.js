//on créer un fichier listeController.js (même fichier que tacheController.js les valeurs changent juste à 
//l'intérieur) pour implémenter les webservices pour les listes

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017/";

exports.listeGet = async function(req, res) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("taches");
        let datas = await dbo.collection("liste").find({}).toArray();
        res.status(200).json(datas);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};

exports.listePost = async function(req, res, next) {
    let liste = req.body;
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("taches");
        await dbo.collection("liste").insertOne(liste);
        res.status(200).json(liste);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};

exports.listeDelete = async function(req, res, next) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("taches");
        await dbo.collection("liste").deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
        await dbo.collection('taches').deleteMany({ statut: req.params.id });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};

exports.listePut = async function(req, res, next) {
    try {
        db = await MongoClient.connect(url);
        let dbo = db.db("taches");
        await dbo.collection("liste").updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: { titre: req.body.titre } });
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err })
    }
};