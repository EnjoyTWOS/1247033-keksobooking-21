'use strict';

(() => {
  const mapElement = document.querySelector(`.map`);
  const pinFragment = document.createDocumentFragment();
  const adForm = document.querySelector(`.ad-form`);
  const formHeader = document.querySelector(`.ad-form-header`);
  const formElements = document.querySelectorAll(`.ad-form__element`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const mapFeatures = document.querySelectorAll(`.map__feature`);
  const mapPinsTemplate = mapElement.querySelector(`.map__pins`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

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
    window.backend.load(successHandler, errorHandler);
  };

  const disableElemnts = () => {
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

  const successHandler = (pins) => {
    for (let i = 0; i < pins.length; i++) {
      pinFragment.appendChild(window.pin.render(pins[i]));
    }
    mapPinsTemplate.appendChild(pinFragment);
  };

  const errorHandler = function (errorMessage) {
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


  init();

  window.map = {
    pinMain: document.querySelector(`.map__pin--main`),
    element: document.querySelector(`.map`),
  };
})();
