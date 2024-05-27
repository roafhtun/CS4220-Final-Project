run server.js
``node server.js``
please help me test the test branch on the github
``http://localhost:3000/api/search?searchTerm=bitcoin`` search for anything you like replace searchTerm
that should also update history in ``http://localhost:3000/api/history``
we can also get history by searchTerm
``http://localhost:3000/api/history?searchTerm=bitcoin`` for a specific term that was searched.

now lookup by id ``http://localhost:3000/api/search/bitcoin/details`` replace bitcoin with any id you see from the search, this should return details about a specific coin.

that should also cache the id and its detail to mongodb, to test the cache
``http://localhost:3000/api/search/bitcoin/details?cache=true`` replace bitcoin with any id you have looked up.
