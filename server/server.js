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
  await collection.insertOne(req.body);
  res.send({});
}); 

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