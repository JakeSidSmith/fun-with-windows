'use strict';

(function () {

  var windowInterval;
  var numberOfWindows = 10;
  var windows = [];
  var width = 150;
  var height = 100;
  var initialized = false;

  function openWindow () {
    var xSpeed = Math.random() * 20;
    var ySpeed = Math.random() * (20 - xSpeed);

    var velX = Math.random() >= 0.5 ? xSpeed : -xSpeed;
    var velY = Math.random() >= 0.5 ? ySpeed : -ySpeed;

    var win = window.open(
      '',
      '_blank',
      'width=' + width + ',' +
      'height=' + height + ',' +
      'left=' + (screen.width / 2 - width / 2) + ',' +
      'top=' + (screen.height / 2 - height / 2)
    );

    win.velX = velX;
    win.velY = velY;

    // window.win = win;

    return win;
  }

  function openWindows () {
    for (var i = 0; i < numberOfWindows; i += 1) {
      windows.push(openWindow());
    }
  }

  function closeWindows () {
    for (var i = 0; i < windows.length; i += 1) {
      windows[i].close();
    }

    windows = [];
  }

  function moveWindows () {
    for (var i = 0; i < windows.length; i += 1) {
      var win = windows[i];

      if (win && !win.closed) {

        if (win.screenX + win.velX <= 50 || win.screenX + win.velX + width >= screen.width - 50) {
          win.velX *= -1;
        } else if (win.screenY + win.velY <= 50 || win.screenY + win.velY + height >= screen.height - 50) {
          win.velY *= -1;
        }

        win.moveBy(win.velX, win.velY);

        // win.velX *= 1.01;
        // win.velY *= 1.01;
      } else {
        windows[i] = openWindow(i);
      }

    }
  }

  function init () {
    initialized = true;

    openWindows();
    windowInterval = setInterval(moveWindows, 1000 / 60);
  }

  function onClick () {
    if (!initialized) {
      init();
    }
  }

  function beforeUnload () {
    var wasInitialized = initialized;
    clearInterval(windowInterval)
    closeWindows();
    initialized = false;

    return wasInitialized ? (
      'Are you sure you want to leave? We were having so much fun. :\'(\n\n' +
      'If you stay, I promise I\'ll close all those windows for you. :)'
    ) : undefined;
  }

  window.onbeforeunload = beforeUnload;
  window.onClick = onClick;

})();
