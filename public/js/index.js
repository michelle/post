$(document).ready(function() {
  var data_count = 0;
  $('#add').click(function() {
    var key_field = $('<input type="text" id="data-' + data_count + '">');
    var value_field = $('<input type="text" id="data-' + data_count + '">');
    $('#data').append(key_field);
    $('#data').append(value_field);
    data_count += 1;
  });
});
