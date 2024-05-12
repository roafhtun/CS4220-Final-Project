import express from 'express';
import * as api from '../services/api.js';
import * as db from '../services/db.js';

//Henry
/** Just claiming this section. Will edit this on Sunday. Template copied from Roaf:
 *
 * Handles the '/history' route, retrieving search history from the database.
 * If a 'searchTerm' query parameter is provided, it retrieves the search history for that term.
 * Otherwise, it retrieves all search history.
 *
 * @param {Object} req - The Express request object.
 * @param {string} [req.query.searchTerm] - The search term to filter the history by.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
const router = express.Router();

router.get('/search', async (req, res) => {
    const { searchTerm } = req.query;
    try {
        const results = await api.searchByTerm(searchTerm);
        await db.updateSearchHistory(searchTerm, results.length);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error searching items' });
    }
});

router.get('/search/:id/details', async (req, res) => {
    const { id } = req.params;
    const { cache } = req.query;
    try {
        let details;
        if (cache === 'true') {
            details = await db.findItemInCache(id);
            if (!details) {
                details = await api.getDetails(id);
                await db.saveItemToCache(id, details);
            }
        } else {
            details = await api.getDetails(id);
            await db.saveItemToCache(id, details);
        }
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving asset details' });
    }
});

export default router;
