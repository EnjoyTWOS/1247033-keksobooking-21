'use strict';

(() => {
  const MAP_PIN_MAIN_ACTIVE_HEIGHT = 84;
  const MAP_PIN_MAIN_DISABLED_HEIGHT = 62;
  const MAP_PIN_MAIN_WIDTH = 62;
  const FORM_TITLE_MIN_LENGTH = 30;
  const FORM_TITLE_MAX_LENGTH = 100;
  const FORM_MAX_PRICE = 1000000;
  const BUNGALOW_MIN_PRICE = 0;
  const FLAT_MIN_PRICE = 1000;
  const HOUSE_MIN_PRICE = 5000;
  const PALACE_MIN_PRICE = 10000;
  const accomodationTypeInput = document.querySelector(`#type`);
  const formAdressInput = document.querySelector(`#address`);
  const roomsQuantityList = document.querySelector(`#room_number`);
  const guestsQuantityList = document.querySelector(`#capacity`);
  const formTitle = document.querySelector(`#title`);
  const formPrice = document.querySelector(`#price`);
  const timeInInput = document.querySelector(`#timein`);
  const timeOutInput = document.querySelector(`#timeout`);
  const formAvatar = document.querySelector(`#avatar`);
  const formImages = document.querySelector(`#images`);

  const init = () => {
    giveAdressDisabled();
    giveTitleAttributes();
    givePriceAttributes();
    giveImagesAttributes();
  };

  const giveImagesAttributes = () => {
    formAvatar.setAttribute(`accept`, `image/*`);
    formImages.setAttribute(`accept`, `image/*`);
  };

  const onTimeInInputChange = (evt) => {
    timeOutInput.value = evt.target.value;
  };

  const onTimeOutInputChange = (evt) => {
    timeInInput.value = evt.target.value;
  };

  const giveTitleAttributes = () => {
    formTitle.setAttribute(`required`, ``);
    formTitle.setAttribute(`minlength`, FORM_TITLE_MIN_LENGTH);
    formTitle.setAttribute(`maxlength`, FORM_TITLE_MAX_LENGTH);
  };


  const givePriceAttributes = () => {
    formPrice.setAttribute(`required`, ``);
    formPrice.setAttribute(`max`, FORM_MAX_PRICE);
    formPrice.setAttribute(`min`, FLAT_MIN_PRICE);
    formPrice.setAttribute(`placeholder`, FLAT_MIN_PRICE);

    const minPriceChanger = () => {
      if (accomodationTypeInput.value === window.card.ACCOMODATION_LIST[0]) {
        formPrice.setAttribute(`min`, BUNGALOW_MIN_PRICE);
        formPrice.setAttribute(`placeholder`, BUNGALOW_MIN_PRICE);
      } else if (accomodationTypeInput.value === window.card.ACCOMODATION_LIST[1]) {
        formPrice.setAttribute(`min`, FLAT_MIN_PRICE);
        formPrice.setAttribute(`placeholder`, FLAT_MIN_PRICE);
      } else if (accomodationTypeInput.value === window.card.ACCOMODATION_LIST[2]) {
        formPrice.setAttribute(`min`, HOUSE_MIN_PRICE);
        formPrice.setAttribute(`placeholder`, HOUSE_MIN_PRICE);
      } else if (accomodationTypeInput.value === window.card.ACCOMODATION_LIST[3]) {
        formPrice.setAttribute(`min`, PALACE_MIN_PRICE);
        formPrice.setAttribute(`placeholder`, PALACE_MIN_PRICE);
      }
    };

    accomodationTypeInput.addEventListener(`change`, minPriceChanger);
  };

  const giveAdressDisabled = () => {
    formAdressInput.value = (parseInt(window.pin.main.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2) + `,` + (parseInt(window.pin.main.style.top, 10) + MAP_PIN_MAIN_DISABLED_HEIGHT / 2);
  };

  const isRoomsValid = () => {
    if (roomsQuantityList.value === `1`) {
      if (guestsQuantityList.value !== `1`) {
        guestsQuantityList.setCustomValidity(`для 1 гостя`);
      } else {
        guestsQuantityList.setCustomValidity(``);
      }
    } else if (roomsQuantityList.value === `2`) {
      if (guestsQuantityList.value !== `1` || guestsQuantityList.value !== `2`) {
        guestsQuantityList.setCustomValidity(`для 2 гостей или для 1 гостя`);
      } else {
        guestsQuantityList.setCustomValidity(``);
      }
    } else if (roomsQuantityList.value === `3`) {
      if (guestsQuantityList.value === `0`) {
        guestsQuantityList.setCustomValidity(`для 3 гостей, для 2 гостей или для 1 гостя`);
      } else {
        guestsQuantityList.setCustomValidity(``);
      }
    } else if (roomsQuantityList.value === `100`) {
      if (guestsQuantityList.value !== `0`) {
        guestsQuantityList.setCustomValidity(`не для гостей`);
      } else {
        guestsQuantityList.setCustomValidity(``);
      }
    } else {
      guestsQuantityList.setCustomValidity(``);
    }
    guestsQuantityList.reportValidity();
  };

  roomsQuantityList.addEventListener(`change`, isRoomsValid);

  timeInInput.addEventListener(`change`, onTimeInInputChange);
  timeOutInput.addEventListener(`change`, onTimeOutInputChange);

  init();

  window.form = {
    giveAdressActive() {
      formAdressInput.value = (parseInt(window.pin.main.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2) + `,` + (parseInt(window.pin.main.style.top, 10) + MAP_PIN_MAIN_ACTIVE_HEIGHT);
      formAdressInput.setAttribute(`disabled`, ``);
    }
  };
})();
