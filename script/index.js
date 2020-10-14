// Script to check for browser support
if (!('indexedDB' in window)) {
  alert('This browser does not support this App, please upgrade');
} else {
  console.log('Browser supports indexedDB');
}

// Open database and check if it needs upgradeding
var connReq = indexedDB.open('myMovieCollection', 1);
connReq.addEventListener('success', function (evt) {
  var db = evt.target.result;
  console.log('Connected to database', evt);
});

connReq.addEventListener('error', function (evt) {
  console.log('Error connecting to database', evt.target.error);
});

connReq.addEventListener('upgradeneeded', function (evt) {
  console.log('upgrade is needed', evt);
  var db = evt.target.result;

  // Create an objectStore for the movie collection database
  var objectStore = db.createObjectStore('movies', { autoIncrement: true });

  // Listen for the completed transaction
  objectStore.transaction.addEventListener('complete', function (evt) {
    console.log('Store created');

    // close the database
    db.close();
  });

});
