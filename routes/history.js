import express from 'express';
import * as db from '../services/db.js';

//Roaf
/**
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

router.get("/history", async (req, res) => {
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
