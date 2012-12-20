$(document).ready(function() {
  var data_count = 0;
  $('#add').click(function() {
    var data_field = $('<input type="text" id="data-' + data_count + '">');
    $('').append(data_field);
    data_count += 1;
  });
});
