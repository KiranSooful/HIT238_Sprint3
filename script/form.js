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
    var formData = JSON.stringify(formDetails);
    localStorage.setItem(formDetails["Title"], formData);

    //test by output to console
    console.log(formData);
    console.log(formDetails);
  });
