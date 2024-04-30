import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Class representing a MongoDB database connection and interactions
 */
class MongoDB {
    /**
     * constructor
     * Loads a .env, initializes a MongoDB connection URL using environment variables,
     * and sets up properties for the MongoDB client and database
     */
    constructor() {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.db = null;
    }

    /**
     * Opens a connection to the MongoDB database
     */
    async connect() {
        await this.client.connect();
        this.db = this.client.db(process.env.DB_NAME);
    }

    /**
     * Closes the connection to the MongoDB database.
     */
    async close() {
        await this.client.close();
    }

    /**
     * Creates a new document in the specified collection
     * @param {string} collectionName - the name of the collection
     * @param {Object} data - the data to be inserted into the collection
     * @returns {Promise<Object>} - a Promise that resolves with the acknowledgement document
     */
    async create(collectionName, data) {
        const collection = this.db.collection(collectionName);
        return await collection.insertOne(data);
    }

    /**
     * Finds documents by their _id in the specified collection
     * @param {string} collectionName - the name of the collection
     * @param {string} _id - the _id of the document to find
     * @returns {Promise<Object>} - a Promise that resolves with the document
     */
    async find(collectionName, _id) {
        const collection = this.db.collection(collectionName);
        return await collection.findOne(_id);
    }
}

export default MongoDB;
