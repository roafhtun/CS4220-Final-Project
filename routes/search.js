import express from 'express';
import * as api from '../services/api.js';
import * as db from '../services/db.js';

//Henry
/** 
 * Handles the '/search' route, retrieving search results from the api.
 * If a searchTerm is present, it returns every object matching the name.
 * This will update the MongoDB on the searchTerm used and the amount of results returned.
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

/** 
 * If cache is true, it finds the object that matches ID in the online database.
 *     If it can't find it, it retrieves it from the api instead and saves it to the online database.
 * If cache is false, it retrieves it from the api and 
 */
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
