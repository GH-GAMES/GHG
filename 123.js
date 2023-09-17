var counter = 1;
var tmp = 'switch';
setInterval(function () {
  document.getElementById('switch' + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 5000);

