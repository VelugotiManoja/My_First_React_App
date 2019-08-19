const MongoClient = require('mongodb').MongoClient;
const _ = require("underscore");
const fs = require('fs');
const moment = require('moment');
const log = fs.createWriteStream('error-' + moment().format('DD-MM-YYYY') + '.log');
dbSet ={};

const getConnection = new Promise((resolve,reject) => {
  if(!dbSet['merritos']){
    //var connURL = "mongodb://merritosAdmin:fgQcw4PtD5YLTx8newWfsgNh@localhost:27037/merritos";
      var connURL = "mongodb://45.118.134.20:27017/merritos";
      MongoClient.connect(connURL, { useNewUrlParser: true })
      .then((db) => {
        dbSet['merritos'] = db;
        resolve(db);
        return;
      })
      .catch((err) => {
        log.write(err.stack + "\n");
        reject(err);
      })
    } else{
      resolve(dbSet['merritos'])
    }
});

module.exports = getConnection;