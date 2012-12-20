$(document).ready(function() {
  var data_count = 0;
  $('#add').click(function() {
    var key_field = $('<input type="text" id="key-' + data_count + '">');
    var value_field = $('<input type="text" id="value-' + data_count + '">');
    $('#data').append(key_field);
    $('#data').append(value_field);
    $('#data').append($('<br/>'));
    data_count += 1;
  });
  $('#submit').click(function() {
    var payload = {}
    for(var i = 0; i < data_count; i++) {
      payload[$('#key-' + i).val()] = $('#value-' + i).val();
    }
    console.log(payload);
  });
});
