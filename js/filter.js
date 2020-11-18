'use strict';

(() => {
  const filterForm = document.querySelector(`.map__filters`);
  const typeInput = filterForm.querySelector(`#housing-type`);

  const checkType = (type) => {
    return typeInput.value === `any` || typeInput.value === type;
  };

  const filterAdvert = () => {
    let filteredAdverts = [];
    for (const advert of adverts) {
      if (
        checkType(advert.offer.type)
      ) {
        filteredAdverts.push(advert);
      }

      if (filteredAdverts.length >= window.map.pinMaxCount) {
        break;
      }
    }
    return filteredAdverts;
  };

  const filterPins = () => {
    window.map.removePins();
    window.pin.removeCard();
    const filteredAdverts = filterAdvert();
    for (let i = 0; i < filteredAdverts.length && i < window.map.pinMaxCount; i++) {
      window.map.pinFragment.appendChild(window.pin.render(filteredAdverts[i]));
    }
    window.map.pinsTemplate.appendChild(window.map.pinFragment);
  };
  filterForm.addEventListener(`change`, filterPins);
})();
