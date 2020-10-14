document.querySelector('#movieDetails').addEventListener('submit', function (evt) {
  evt.preventDefault();

  //get form data
  searchDetail = document.getElementById('title').value;

  // Open database
  var connReq = indexedDB.open('myMovieCollection', 1);

  connReq.addEventListener('success', function (evt) {
      var db = evt.target.result;
      console.log('Connected to database', evt);

      // Create transaction and add data from the form
      var transaction = db.transaction(['movies'], 'readwrite');
      var objectStore = transaction.objectStore('movies');

      objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          var condition = cursor.value.Title.includes(searchDetail);
          if (condition == true) {
            console.log(JSON.stringify(cursor.value));
          }

          //console.log('Title ' + cursor.key + ' is ' + cursor.value.Title);
          cursor.continue();
        } else {
          console.log('No more entries!');
        }
      };

      // close the database and reset the form
      db.close();
      document.getElementById('movieDetails').reset();

      connReq.addEventListener('error', function (evt) {
        console.log('Error connecting to database', evt.target.error);
      });
    });

});
