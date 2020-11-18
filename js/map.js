'use strict';

(() => {
  const MAX_PINS_TO_SHOW = 5;
  const MAP_PIN_MAIN_X_CONST = 570;
  const MAP_PIN_MAIN_Y_CONST = 375;
  const mapElement = document.querySelector(`.map`);
  const pinFragment = document.createDocumentFragment();
  const adForm = document.querySelector(`.ad-form`);
  const formHeader = document.querySelector(`.ad-form-header`);
  const formElements = document.querySelectorAll(`.ad-form__element`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const mapFeatures = document.querySelectorAll(`.map__feature`);
  const mapPinsTemplate = mapElement.querySelector(`.map__pins`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const formResetButton = document.querySelector(`.ad-form__reset`);
  let adverts = [];


  const init = () => {
    disableElemnts();
  };

  const enableElements = () => {
    mapElement.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    formHeader.removeAttribute(`disabled`, `disabled`);
    for (const formElement of formElements) {
      formElement.removeAttribute(`disabled`, `disabled`);
    }
    for (const mapFilter of mapFilters) {
      mapFilter.removeAttribute(`disabled`, `disabled`);
    }
    for (const mapFeature of mapFeatures) {
      mapFeature.removeAttribute(`disabled`, `disabled`);
    }
    window.form.giveAdressActive();
    window.backend.load(onSuccess, onError);
  };

  const disableElemnts = () => {
    window.pin.mapElement.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    window.pin.main.style.left = MAP_PIN_MAIN_X_CONST + `px`;
    window.pin.main.style.top = MAP_PIN_MAIN_Y_CONST + `px`;
    formHeader.setAttribute(`disabled`, `disabled`);
    for (const formElement of formElements) {
      formElement.setAttribute(`disabled`, `disabled`);
    }
    for (const mapFilter of mapFilters) {
      mapFilter.setAttribute(`disabled`, `disabled`);
    }
    for (const mapFeature of mapFeatures) {
      mapFeature.setAttribute(`disabled`, `disabled`);
    }
  };

  const removePins = () => {
    const mapPinsNotMain = document.querySelectorAll(`#mapPinNotMain`);
    for (const mapPinNotMain of mapPinsNotMain) {
      mapPinNotMain.remove();
    }
  };

  const onSubmit = (evt) => {
    window.backend.save(new FormData(adForm), () => {
      adForm.reset();
      disableElemnts();
      removePins();
    }, onError);
    evt.preventDefault();
  };

  adForm.addEventListener(`submit`, onSubmit);
  formResetButton.addEventListener(`click`, () => {
    adForm.reset();
    disableElemnts();
    removePins();
  });

  const onSuccess = (pins) => {
    removePins();
    window.pin.removeCard();
    for (let i = 0; i < pins.length && i < MAX_PINS_TO_SHOW; i++) {
      pinFragment.appendChild(window.pin.render(pins[i]));
    }

    adverts = pins;
    mapPinsTemplate.appendChild(pinFragment);
  };

  const onError = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    window.util.isMainButton(evt, enableElements);
  });
  mapPinMain.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, enableElements);
  });

  const getAdverts = () => {
    return adverts;
  };

  init();

  window.map = {
    getAdverts,
    removePins,
    pinMaxCount: MAX_PINS_TO_SHOW,
    pinFragment,
    pinsTemplate: mapPinsTemplate
  };
})();
