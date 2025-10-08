import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
if (!process.env.MONGODB_PASSWORD) throw new Error("Missing MONGODB_PASSWORD");

let mongodb_uri = process.env.MONGODB_URI;
mongodb_uri = mongodb_uri.replace("<db_password>", process.env.MONGODB_PASSWORD);

const client = new MongoClient(mongodb_uri);
const db = client.db("Shoukai");

export { client, db };