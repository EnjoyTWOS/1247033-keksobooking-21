'use strict';

(() => {
  const MAP_PIN_MAIN_ACTIVE_HEIGHT = 84;
  const MAP_PIN_MAIN_DISABLED_HEIGHT = 62;
  const MAP_PIN_MAIN_WIDTH = 62;
  const formAdressInput = document.querySelector(`#address`);
  const roomsQuantityList = document.querySelector(`#room_number`);
  const guestsQuantityList = document.querySelector(`#capacity`);

  const init = () => {
    giveAdressDisabled();
  };

  const giveAdressDisabled = () => {
    formAdressInput.value = (parseInt(window.map.pinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2) + `,` + (parseInt(window.map.pinMain.style.top, 10) + MAP_PIN_MAIN_DISABLED_HEIGHT / 2);
  };

  const isRoomsValid = () => {
    if (roomsQuantityList.value === `1`) {
      if (guestsQuantityList.value !== `1`) {
        guestsQuantityList.setCustomValidity(`для 1 гостя`);
      }
    } else if (roomsQuantityList.value === `2`) {
      if (guestsQuantityList.value !== `1` || guestsQuantityList.value !== `2`) {
        guestsQuantityList.setCustomValidity(`для 2 гостей или для 1 гостя`);
      }
    } else if (roomsQuantityList.value === `3`) {
      if (guestsQuantityList.value === `0`) {
        guestsQuantityList.setCustomValidity(`для 3 гостей, для 2 гостей или для 1 гостя`);
      }
    } else if (roomsQuantityList.value === `100`) {
      if (guestsQuantityList.value !== `0`) {
        guestsQuantityList.setCustomValidity(`не для гостей`);
      }
    } else {
      guestsQuantityList.setCustomValidity(``);
    }
    guestsQuantityList.reportValidity();
  };

  roomsQuantityList.addEventListener(`change`, isRoomsValid);

  init();

  window.form = {
    giveAdressActive() {
      formAdressInput.value = (parseInt(window.map.pinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2) + `,` + (parseInt(window.map.pinMain.style.top, 10) + MAP_PIN_MAIN_ACTIVE_HEIGHT);
    }
  };
})();
