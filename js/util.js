'use strict';

(() => {
  const ENTER_KEY = `Enter`;
  window.util = {
    isEnterEvent(evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        evt.preventDefualt();
        action();
      }
    },
    isMainButton(evt, action) {
      if (typeof evt === `object`) {
        if (evt.button === 0) {
          action();
        }
      }
    },
    rand(min, max) {
      return min + Math.floor(Math.random() * (max - min));
    },
    getRandomArrI(arr) {
      const randomize = Math.floor(Math.random() * arr.length);
      return arr[randomize];
    }
  };
})();
