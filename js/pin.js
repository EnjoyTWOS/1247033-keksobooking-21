'use strict';

(() => {
  const MAP_PIN_HEIGHT = 70;
  const MAP_PIN_WIDTH = 50;
  const pinTemplate = document.querySelector(`#pin`).content;

  window.pin = {
    render(pin) {
      const mapPin = pinTemplate.cloneNode(true);

      mapPin.querySelector(`.map__pin`).style.left = pin.location.x - MAP_PIN_WIDTH / 2 + `px`;
      mapPin.querySelector(`.map__pin`).style.top = pin.location.y - MAP_PIN_HEIGHT + `px`;
      mapPin.querySelector(`img`).setAttribute(`src`, pin.author.avatar);
      mapPin.querySelector(`img`).setAttribute(`alt`, pin.offer.title);

      return mapPin;
    }
  };
})();
