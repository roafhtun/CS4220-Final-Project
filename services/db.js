import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function connectToDatabase() {
    await client.connect();
}

//roaf
/**
 * Updates the search history for a given search term, incrementing the search count and updating the last searched date.
 * If the search term does not exist in the search history, a new entry is created.
 *
 * @param {string} searchTerm - The search term to update in the search history.
 * @param {number} count - The new search count for the given search term.
 * @returns {Promise<void>} - A promise that resolves when the search history has been updated.
 */
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

/**
 * Retrieves the search history records that match the provided search term.
 *
 * @param {string} searchTerm - The search term to filter the search history by.
 * @returns {Promise<any[]>} - An array of search history records that match the provided search term.
 */
export async function getSearchHistoryByTerm(searchTerm) {
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection('search_history');
  return await collection.find({ searchTerm }).toArray();
}

/**
 * Retrieves all search history records from the 'search_history' collection in the database.
 * @returns {Promise<any[]>} An array of all search history records.
 */
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