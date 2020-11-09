'use strict';

(() => {

  window.map = {
    mapPinMain: document.querySelector(`.map__pin--main`),
  };

  const mapElement = document.querySelector(`.map`);
  const fragment = document.createDocumentFragment();
  const adForm = document.querySelector(`.ad-form`);
  const formHeader = document.querySelector(`.ad-form-header`);
  const formElements = document.querySelectorAll(`.ad-form__element`);
  const mapFilters = document.querySelectorAll(`.map__filter`);
  const mapFeatures = document.querySelectorAll(`.map__feature`);
  const mapPinsTemplate = mapElement.querySelector(`.map__pins`);

  const init = () => {
    disableElemnts();
    window.card.renderMapsCardsArray();
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
    renderMapPinsTemplate();
    window.form.giveAdressActive();
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

  const renderMapPinsTemplate = () => {
    for (let i = 0; i < window.card.mapsCardTemplateArray.length; i++) {
      fragment.appendChild(window.pin.renderPin(window.card.mapsCardTemplateArray[i]));
    }
    mapPinsTemplate.appendChild(fragment);
  };

  window.map.mapPinMain.addEventListener(`mousedown`, (evt) => {
    window.util.isMainButton(evt, enableElements);
  });
  window.map.mapPinMain.addEventListener(`keydown`, (evt) => {
    window.util.isEnter(evt, enableElements);
  });

  init();
})();
