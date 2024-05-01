import express from 'express';
import searchRoutes from './routes/search.js';
import historyRoutes from './routes/history.js';
import * as db from './services/db.js';

const app = express();

app.use(express.json());
app.use('/api', searchRoutes);
app.use('/api', historyRoutes);

app.get('/api', (req, res) => {
    res.send('Welcome to the API!');
});
  
const PORT = process.env.PORT || 3000;

db.connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    });
