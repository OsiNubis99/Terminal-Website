jQuery(function($) {
  function type(term, message) {
    anim = true;
    var delay = 175;
    var prompt = term.get_prompt();
    var c = 0;
    if (message.length > 0) {
      term.set_prompt('');
      var new_prompt = '';
      var interval = setInterval(function() {
        var chr = $.terminal.substring(message, c, c+1);
        new_prompt += chr;
        term.set_prompt(new_prompt);
        c++;
        if (c == length(message)) {
          clearInterval(interval);
          setTimeout(function() {
            anim = false;
            term.echo(message);
            term.set_prompt(prompt);
          }, delay);
        }
      }, delay);
    }
  };
  function length(string) {
    string = $.terminal.strip(string);
    return $('<span>' + string + '</span>').text().length;
  }
  function progress(percent, width) {
    var size = Math.round(width*percent/100);
    var left = '', taken = '', i;
    for (i=size; i--;) {
      taken += '=';
    }
    if (taken.length > 0) {
      taken = taken.replace(/=$/, '>');
    }
    for (i=width-size; i--;) {
      left += ' ';
    }
    return '[' + taken + left + '] ' + percent + '%';
  }
  var animation = false;
  var timer;
  var prompt;
  var string;
  $('body').terminal(function(command, term) {
    var cmd = $.terminal.parse_command(command);
    var msg = "";
    switch(cmd.name){
      case "progress":
        var i = 0, size = cmd.args[0];
        prompt = term.get_prompt();
        string = progress(0, size);
        term.set_prompt(progress);
        animation = true;
        (function loop() {
          string = progress(i++, size);
          term.set_prompt(string);
          if (i < 100) {
            timer = setTimeout(loop, 100);
          } else {
            term.echo(progress(i, size) + ' [[b;green;]OK]')
                .set_prompt(prompt);
            animation = false
          }})();
        break;
      default:
        msg = `Are you sure that is correct?\nI don't think so... please use "help" to see all avalible comands ;)`;
        type(term,msg);
        break;
    }
  }, {
    name: 'Terminal',
    greetings: "OsiNubis99 - Terminal",
    onInit: function(term) {
      type(term, "Wellcome to my terminal");
    },
    keydown: function(e, term) {
      if (animation) {
        if (e.which == 68 && e.ctrlKey) { // CTRL+D
          clearTimeout(timer);
          animation = false;
          term.echo(string + ' [[b;red;]FAIL]')
              .set_prompt(prompt);
        }
        return false;
      }
    }
  });
});
