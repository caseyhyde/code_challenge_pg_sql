$(document).ready(function () {

  // get treats on load
  getTreats();

  /**---------- Event Handling ----------**/
  $('#searchButton').on('click', function (event) {
    event.preventDefault();

    var queryString = $('#search').val();

    searchTreats(queryString);
  });

  $('#saveNewButton').on('click', function(event) {
    event.preventDefault();

    var treateName = $('#treatNameInput').val();
    var treatDescription = $('#treatDescriptionInput').val();
    var treateURL = $('#treatUrlInput').val();

    var newTreat = {
      name: treateName,
      description: treatDescription,
      url: treateURL
    };

    postTreat(newTreat);
  });

  $('body').on('dblclick', 'h3', toInput); //on double click, change treat names to inputs
  $('body').on('dblclick', 'p', toInput);//same, but for treat description
  $()

  /**---------- AJAX Functions ----------**/

  // GET /treats
  function getTreats() {
    $.ajax({
      method: 'GET',
      url: '/treats',
    })
    .done(function (treatArray) {
      console.log('GET /treats returned ', treatArray);

      $.each(treatArray, function (index, treat) {
        appendTreat(treat);
      });
    });
  }

  // Search GET /treats/thing
  function searchTreats(query) {
    $.ajax({
      method: 'GET',
      url: '/treats/' + query,
    })
    .done(function (treatArray) {
      console.log('GET /treats/', query, 'returned ', treatArray);

      clearDom();

      $.each(treatArray, function (index, treat) {
        // add this treat to the DOM
        appendTreat(treat);
      });
    });
  }

  // POST /treats
  function postTreat(treat) {
    $.ajax({
      method: 'POST',
      url: '/treats',
      data: treat,
    })
    .done(function () {
      console.log('POST /treats sent ', treat);
      clearDom();
      getTreats();
    });
  }

  /** ---------- DOM Functions ----------**/

  function clearDom() {
    var $treats = $('#treat-display');
    $treats.empty();
  }

  function appendTreat(treat) {
    // append a treat to the DOM and add data attributes
    // treat-display -> treat row -> treat
    var $treats = $('#treat-display');

    var treatCount = $treats.children().children().length;

    if (treatCount % 2 === 0) {
      // add a treat row every 2 treats
      $treats.append('<div class="treat row"></div>');
    }

    var $treat = $('<div class="six columns individual-treat">' +
                  '<div class="image-wrap">' +
                  '<img src="' + treat.pic + '" class="u-max-full-width" />' +
                  '<div class="toggle row">' +
                  '<div class="six columns">' +
                  '<button class="edit u-full-width">Edit</button>' +
                  '</div>' +
                  '<div class="six columns">' +
                  '<button class="delete u-full-width">Delete</button>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<h3>' + treat.name + '</h3>' +
                  '<p>' + treat.description + '</p>' +
                  '</div>');

    $treat.data('id', treat.id);

    $('.treat:last-of-type').append($treat);
  }

  function updateTreat() {
    var treatId = $(this).parent().data('id');
    var treatUpdate = $(this).prev().val();
    $.ajax({
      type: 'PUT',
      url: '/treats/' + treatId,
      data: treatUpdate,
      success: function() {
        getTreats();
      }
    });
  }

  function toInput() {
    var input = $(this).text();
    $(this).replaceWith('<input class="newinput" type="text" value="' + input + '" />' +
    '<button id="update">update</button>');
  }

});
