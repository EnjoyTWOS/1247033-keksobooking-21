'use strict';

(() => {
  const ENTER_KEY = `Enter`;
  const ESCAPE_KEY = `Escape`;
  const DEBOUNCE_INTERVAL = 500;

  window.util = {
    isEnterEvent(evt, action) {
      if (evt.key === ENTER_KEY) {
        action();
      }
    },
    isEscapeEvent(evt, action) {
      if (evt.key === ESCAPE_KEY) {
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
    },
    debounce(cb) {
      let lastTimeout = null;

      return (...parameters) => {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(() => {
          cb(...parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
