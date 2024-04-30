// app.js
import { select } from "@inquirer/prompts";
import * as api from "./api.js";
import * as db from "./db.js";

// Helper functions for printing
const _printConsole = (crypto) => {
  console.log("- - - - - - - - - - - - - - - - - - - - -");
  console.log(`Name: ${crypto.name}`);
  console.log(`Code: ${crypto.symbol}`);
  console.log(`Rank: ${crypto.rank}`);
  console.log("USD: $" + Number(crypto.priceUsd).toFixed(2));
  console.log("Max Supply: " + Number(crypto.maxSupply).toFixed(0));
  console.log("- - - - - - - - - - - - - - - - - - - - -");
};

const _showResults = async (results) => {
  const displayResults = results.map((entry) => {
    return { name: `${entry.name} (${entry.symbol})`, value: entry.id };
  });
  const selected = await select({
    message: "Select which cryptocurrency to inspect",
    choices: displayResults,
  });
  return selected;
};

export const showDetails = async (currencyId, useCache = false) => {
  try {
    const cache = await db.find("search_cache");
    const cachedItem = cache.find((item) => item.id === currencyId);

    if (useCache && cachedItem) {
      console.log("Fetching from cache...");
      _printConsole(cachedItem.data);
      return;
    }

    console.log("Fetching from API...");
    const crypto = await api.fetchAssetInfo(currencyId);

    // Update the cache with the new data
    await db.create("search_cache", { id: currencyId, data: crypto });
    _printConsole(crypto);
  } catch (error) {
    console.error("Error in showDetails:", error.message);
  }
};

export const showResults = async (currency, useCache) => {
  try {
    const results = await api.searchAssets(currency);
    const resultCount = results.length;
    if (resultCount > 0) {
      const selectedId = await _showResults(results);
      await showDetails(selectedId, useCache);

      // Save the search to history with resultCount and the current date and time
      const historyEntry = {
        search: currency, // The search keyword
        resultCount: resultCount, // The number of results
        date: new Date().toLocaleString() // The current date and time in ISO format
      };
      await db.create("search_history", historyEntry);
    } else {
      console.log("No results found.");
    }
  } catch (error) {
    console.error("Error during search:", error.message);
  }
};



export const cryptoHistory = async () => {
  try {
    const history = await db.find("search_history");
    if (history && history.length > 0) {
      console.log("Previous cryptocurrencies selected:");
      history.forEach((entry) => {
        console.log(`- ${entry.search} at ${entry.date} with ${entry.resultCount} results`);
      });
    } else {
      console.log("No history available.");
    }
  } catch (error) {
    console.error("Error retrieving history:", error.message);
  }
};
