// Run some jQuery
$(document).ready(() => {
  // On click run code
  $('#search').click(() => {
    // Get value of input field
    const searchTerm = $('#searchTerm').val();
    // Run ajax and get return in data type JSON
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json&callback=?`;
    console.log(url);
    $.ajax({
      type: 'GET',
      url,
      contentType: 'application/json; charset=utf-8',
      async: false,
      /**
       *
       *This function returns the Wikipedia articles
       * @param {any} data
       * @param {any} textStatus
       * @param {any} jqXHR
       */
      success(data, textStatus, jqXHR) {
        $('#output').html('');
        for (let i = 0; i < data[1].length; i++) {
          $('#output').append(
            `<div><div class='btn-primary'><a href=${data[3][i]}><h2>${
              data[1][i]
            }</h2>` + `<p>${data[2][i]}</p></a></div></div>`
          );
        }
        $('#searchTerm').val('');
      },
      error(errorMessage) {
        console.log(errorMessage);
      }
    });
  });
  $('#searchTerm').keypress(e => {
    if (e.which === 13) {
      $('#search').click();
    }
  });
});
