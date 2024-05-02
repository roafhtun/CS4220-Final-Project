import express from 'express';
import * as db from '../services/db.js';

//Roaf
const router = express.Router();

router.get('/history', async (req, res) => {
    const { searchTerm } = req.query;
    try {
        let history;
        if (searchTerm) {
            history = await db.getSearchHistoryByTerm(searchTerm);
        } else {
            history = await db.getAllSearchHistory();
        }
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving search history' });
    }
});

export default router;
