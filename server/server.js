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
const database = client.db("Shoukai");
const favorites = database.collection("Favorites");
const history = database.collection("History");

server.use(cors());
server.use(express.json());

server.delete("/clearHistory", (req, res) => {
  history.deleteMany();
})

server.delete("/clearFavorites", (req, res) => {
  favorites.deleteMany();
})

server.post('/addFavorite/', async(req, res) => {
  if(req.body.characterId){
    const query = {characterId: req.body.characterId};
    const exists = await favorites.findOne(query);

    if(!exists){
      await favorites.insertOne(req.body);
      res.send({status: "Added to favorites!"})
    }else{
      res.send({status: "Already favorited!"})
    }
  }else if(req.body.animeId){
    const query = {animeId: req.body.animeId};
    const exists = await favorites.findOne(query);

    if(!exists){
      await favorites.insertOne(req.body);
      res.send({status: "Added to favorites!"})
    }else{  
      res.send({status: "Already favorited!"})
    }
  }else{
    res.send({status: "Failed to add to favorites"});
  }
}); 

server.post('/addHistory', async(req, res) => {
  const query = {animeId: req.body.animeId};
  const exists = await history.findOne(query);
  if(!exists){
    await history.insertOne(req.body);
  }
  
  res.send({});
}); 

server.get('/getHistory', async(req, res) => {
  let result = await history.find({}).toArray();
  res.send(result);
})

server.get("/getAnime/:id", async(req, res) => {
  const query = {animeId: req.params.id};
  console.log(query)
  const exists = await history.findOne(query);
  console.log(exists);

  if(exists){
    res.send(exists);
  }else{
    res.send({status: "Not Found"});
  }
})

server.get('/getFavorites', async(req, res) => {
  let result = await favorites.find({}).toArray();
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