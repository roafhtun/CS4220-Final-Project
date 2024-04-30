import MongoDB from './db.js';

async function main() {
    const db = new MongoDB();

    try {
        // Connect to MongoDB
        await db.connect();
        console.log('Connected to MongoDB');

        // Test data insertion
        const testData = {
            first: 'Harley',
            last: 'Quinn',
            city: 'Gotham City',
            occupation: 'Supervillain'
        };
        const insertResult = await db.create('villains', testData);

        // Fetching the inserted data
        const foundData = await db.find('villains', { _id: insertResult.insertedId });
        console.log('FOUND:', foundData);
    } catch (error) {
        // Log any errors that occur during the operation
        console.error('Error:', error);
    } finally {
        // Close the database connection
        await db.close();
        console.log('Closed connection to MongoDB');
    }
}

main();
