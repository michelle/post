$(document).ready(function() {
  var yellow = '#809a9f';
  var red = '#d5705e';
  var green = '#8cb279';

  var data_count = 0;
  $('#add').click(function() {
    var key_field = $('<input type="text" id="key-' + data_count + '">');
    var value_label = $('<label id="label-' + data_count + '" class="clicky" index="0">TYPE: STRING (Click to toggle)</label>');
    var value_field = $('<input type="text" id="value-' + data_count + '">');
    var value_div = $('<div></div>').addClass('value').append(value_label).append(value_field);
    $('#data').append(key_field);
    $('#data').append('<div class="colon">:</div>');
    $('#data').append(value_div);
    $('#data').append($('<br/>'));
    data_count += 1;
  });

  var types = ['Type: STRING', 'Type: ARRAY', 'Type: NUMBER'];
  $(document).on('click', '.clicky', function() {
    var index = (parseInt($(this).attr('index')) + 1) % 3;
    $(this).text(types[index]);
    $(this).attr('index', index.toString());
    if (index == 1) {
      $
    }
  });
  $('#submit').click(function() {
    var payload = {}
    for(var i = 0; i < data_count; i++) {
      var key = $('#key-' + i).val();
      if (key != '') {
        var type = $('#label-' + i).text().split(' ').pop();
        var value = $('#value-' + i).val();
        if (type == 'ARRAY') {
          value = strip_ends(value, '[');
          value = strip_ends(value, '"');
          value = strip_ends(value, "'");
          value = value.split(/['|"],\s*['|"]/);
          for (var j = 0; j < value.length; j += 1) {
            console.log(value);
            value[j] = strip_ends(value[j], '"');
            value[j] = strip_ends(value[j], "'");
          }
        } else if (type == 'NUMBER') {
          value = parseInt(value);
        } else {
          value = strip_ends($('#value-' + i).val(), '"');
        }
        payload[key] = value;
      }
    }
    $('#response').css({ 'backgroundColor': yellow });
    $('#res').text('Please wait...');
    $.post('/post', {
      url: $('#url').val(),
      username: $('#username').val() || undefined,
      password: $('#username').val() != '' ? $('#password').val() : undefined,
      data: payload
    }, function(response) {
      console.log(response);
      $('#req').text(JSON.stringify(payload));
      if (!response.status) {
        $('#response').css({ 'backgroundColor': green });
      } else {
        $('#response').css({ 'backgroundColor': red });
      }
      $('#res').text(JSON.stringify(response.response));
    });
    console.log(payload);
  });

  function strip_ends(str, ends) {
    var special = { '[' : ']',
                    '(' : ')',
                    '<' : '>',
                    '{' : '}' };

    if (str.charAt(0) == ends &&
        (str.charAt(str.length - 1) == ends ||
        str.charAt(str.length - 1) == special[ends])) {
      str = str.slice(1, str.length - 1);
    }
    return str;
  }
});
