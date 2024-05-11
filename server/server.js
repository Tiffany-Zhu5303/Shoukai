console.clear();

import express from 'express';
import cors from 'cors';

import { MongoClient, ServerApiVersion } from 'mongodb';

const PORT = 3000;
const server = express();

const uri = 'mongodb+srv://Tiffany:l4d0OApB8MVUxd0y@cluster0.a0hdevl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
await client.connect();

server.use(cors());
server.use(express.json());

server.post('/addFavorite', async(req, res) => {
  const database = client.db("Shoukai");
  const collection = database.collection("Favorites");
  if(req.body.characterId){
    const query = {characterId: req.body.characterId};
    const exists = await collection.findOne(query);

    if(!exists){
      await collection.insertOne(req.body);
    }
  }else if(req.body.animeId){
    const query = {animeId: req.body.animeId};
    const exists = await collection.findOne(query);

    if(!exists){
      await collection.insertOne(req.body);
    }
  }
  res.send({});
}); 

server.post('/addHistory', async(req, res) => {
  const database = client.db("Shoukai");
  const collection = database.collection("History");
  const query = {animeId: req.body.animeId};
  const exists = await collection.findOne(query);
  if(!exists){
    await collection.insertOne(req.body);
  }
  
  res.send({});
}); 

server.get('/getHistory', async(req, res) => {
  const database = client.db("Shoukai");
  const collection = database.collection("History");
  let result = await collection.find({}).toArray();
  res.send(result);
})

server.get('/getFavorites', async(req, res) => {
  const database = client.db("Shoukai");
  const collection = database.collection("Favorites");
  let result = await collection.find({}).toArray();
  res.send(result);
})

server.get('/connection', async (req, res) => {
  const ping = await client.db('admin').command({ ping: 1 })
  const dbs = await client.db().admin().listDatabases();
  res.end(JSON.stringify({
    ping,
    dbs
  }));
})

server.get('/db/findOne/:db/:collection', async (req, res) => {
  const { db, collection } = req.params;
  const result = await client.db(db).collection(collection).findOne({});
  res.send(result);
});

server.get('/', (req, res) => {
  res.send('<h1>Connected Server!</h1>')
})

server.listen(PORT, () => {
  console.log(`Server Listening On Port:${PORT}`);
})