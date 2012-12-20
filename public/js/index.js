$(document).ready(function() {
  var data_count = 0;
  $('#add').click(function() {
    var key_field = $('<input type="text" id="key-' + data_count + '">');
    var value_label = $('<label for="value-' + data_count + '">Lists, Strings, or Numbers</label>');
    var value_field = $('<input type="text" id="value-' + data_count + '">');
    var value_div = $('<div></div>').addClass('value').append(value_label).append(value_field);
    $('#data').append(key_field);
    $('#data').append('<div class="colon">:</div>');
    $('#data').append(value_div);
    $('#data').append($('<br/>'));
    data_count += 1;
  });
  $('#submit').click(function() {
    var payload = {}
    for(var i = 0; i < data_count; i++) {
      payload[$('#key-' + i).val()] = $('#value-' + i).val();
    }
    $.post('/post', {
      url: $('#url').val(),
      username: $('#username').val() || undefined,
      password: $('#password').val() || undefined,
      data: payload
    }, function(response) {
      console.log(response);
    });
    console.log(payload);
  });
});
