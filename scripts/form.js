document.querySelector('.detailForm').addEventListener('save', function (evt)
  {
    evt.preventDefault();

    formDetails = {
      title: document.getElementById('title').value,
      genre: document.getElementById('genre').value,
      director: document.getElementById('director').value,
      actor1: document.getElementById('actor1').value,
      actor2: document.getElementById('actor2').value,
    };

    console.log(formDetails);
  });
