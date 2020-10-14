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

document.querySelector('#movieDetails').addEventListener('submit', function (evt) {
    evt.preventDefault();

    //get form data
    formDetails = {
      Title: document.getElementById('title').value,
      Genre: document.getElementById('genre').value,
      Director: document.getElementById('director').value,
      Actor1: document.getElementById('actor1').value,
      Actor2: document.getElementById('actor2').value,
      format: {
        VHS: document.querySelector('#VHS').checked,
        BluRay: document.querySelector('#Blu-Ray').checked,
        DVD: document.querySelector('#DVD').checked,
        D: document.querySelector('#D').checked,
        K: document.querySelector('#K').checked,
      },
    };

    //Stringify and save form data to lolcal storage
    //var formData = JSON.stringify(formDetails);
    //localStorage.setItem(formDetails['Title'], formData);

    // Open database
  var connReq = indexedDB.open('myMovieCollection', 1);

  connReq.addEventListener('success', function (evt) {
      var db = evt.target.result;
      console.log('Connected to database', evt);

      // Create transaction and add data from the form
      var transaction = db.transaction(['movies'], 'readwrite');
      var objectStore = transaction.objectStore('movies');
      var request = objectStore.add(formDetails);

      request.addEventListener('success', function (evt) {
        alert('Successfully added data', evt.target.result);

        // close the database
        db.close();
      });

      connReq.addEventListener('error', function (evt) {
        console.log('Error connecting to database', evt.target.error);
      });
  });
