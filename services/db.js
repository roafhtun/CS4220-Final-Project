import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectToDatabase() {
    await client.connect();
}

//roaf
export async function updateSearchHistory(searchTerm, count) {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('search_history');
    const existingEntry = await collection.findOne({ searchTerm });
    if (existingEntry) {
        await collection.updateOne(
            { searchTerm },
            { $set: { lastSearched: new Date(), searchCount: count } }
        );
    } else {
        await collection.insertOne({
            searchTerm,
            searchCount: count,
            lastSearched: new Date(),
        });
    }
}

export async function getSearchHistoryByTerm(searchTerm) {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('search_history');
    return await collection.find({ searchTerm }).toArray();
}

export async function getAllSearchHistory() {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('search_history');
    return await collection.find().toArray();
}


//end roaf

export async function findItemInCache(id) {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('search_cache');
    return await collection.findOne({ id });
}

export async function saveItemToCache(id, data) {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('search_cache');
    await collection.updateOne({ id }, { $set: data }, { upsert: true });
}