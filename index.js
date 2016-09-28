'use strict';

(function () {

  var win;
  var width = 150;
  var height = 100;
  var velX, velY;
  var initialized = false;

  function openWindow () {
    var xSpeed = Math.random() * 20;
    var ySpeed = Math.random() * (20 - xSpeed);

    velX = Math.random() >= 0.5 ? xSpeed : -xSpeed;
    velY = Math.random() >= 0.5 ? ySpeed : -ySpeed;

    win = window.open(
      '',
      '_blank',
      'width=' + width + ',' +
      'height=' + height + ',' +
      'left=' + (screen.width / 2 - width / 2) + ',' +
      'top=' + (screen.height / 2 - height / 2)
    );

    // window.win = win;
  }

  function init () {
    initialized = true;

    setInterval(function () {
      if (win && !win.closed) {

        if (win.screenX + velX <= 50 || win.screenX + velX + width >= screen.width - 50) {
          velX *= -1;
        } else if (win.screenY + velY <= 50 || win.screenY + velY + height >= screen.height - 50) {
          velY *= -1;
        }

        win.moveBy(velX, velY);

        velX *= 1.01;
        velY *= 1.01;
      } else {
        openWindow();
      }
    }, 1000 / 60);
  }

  function onClick () {
    if (!initialized) {
      init();
    }
  }

  window.onClick = onClick;

})();
