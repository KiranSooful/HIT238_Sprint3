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

        // close the database and reset the form
        db.close();
        document.getElementById('movieDetails').reset();
      });

      connReq.addEventListener('error', function (evt) {
        console.log('Error connecting to database', evt.target.error);
      });
    });

});
