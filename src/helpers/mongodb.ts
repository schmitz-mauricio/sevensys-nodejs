const configMongo = require("../config/mongodb").configMongo;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const GridFs = require('grid-fs');

const conn = {};
const gridFs = {};

const url = configMongo.uri;
const database = configMongo.database;

function connect(){
    return new Promise((resolve, reject) => {
        try {
            MongoClient.connect(url, {
                poolSize: 10,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err, client) => {
                if(err) reject (err);

                const db = client.db(database);

                conn[database] = db;
                gridFs[database] = new GridFs(db);
                resolve(db);
            });
        } catch (e) {
            console.log(e.message);
        }
    })
}

function find(collection, search, sort, page = 1, limit = 1000) {
    return new Promise(async (resolve, reject) => {
        const sortBy = (sort === undefined || sort === 'asc') ? { createdAt: 1 } : sort;

        const skip = (page - 1) * limit;

        conn[configMongo.database].collection(collection).find(search)
        .skip(skip)
        .limit(limit)
        .sort(sortBy)
        .toArray(async (err, data) => {
            if (err) reject(err);
            if (data !== undefined) {
                resolve(data);
            } else {
                resolve(0);
            }
        });
    });
}


function save(collection, data) {
    return new Promise((resolve, reject) => {
        data.createdAt = new Date();
        conn[configMongo.database].collection(collection).insertOne(data, (err, response) => {
            if (err) reject(err);
            resolve(response);
        });
    });
}

function updateManySet(collection, query, data) {
    return new Promise((resolve, reject) => {
      data.$set.updatedAt = new Date();
      conn[configMongo.database].collection(collection).updateMany(query, data, (err, response) => {
          if (err) reject(err);
          resolve(response);
        });
    });
}
  
function deleteMany(collection, dados) {
    return new Promise((resolve, reject) => {
      conn[configMongo.database].collection(collection).deleteMany(dados, (err, data) => {
        if (err) reject(err);
        if (data !== undefined) {
          resolve(data);
        } else {
          resolve(0);
        }
      });
    });
}

function genObjectId(id){
    return ObjectId(id);
}

module.exports = {
    connect,
    find,
    save,
    updateManySet,
    deleteMany,
    genObjectId
}