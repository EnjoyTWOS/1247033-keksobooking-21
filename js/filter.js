'use strict';

(() => {
  const ANY_INPUT_VALUE = `any`
  const PRICE_MIN_LIMIT = 10000;
  const PRICE_MAX_LIMIT = 50000;
  const Price = {
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`,
    ANY: `any`
  };
  const filterForm = document.querySelector(`.map__filters`);
  const filterTypeInput = filterForm.querySelector(`#housing-type`);
  const filterPriceInput = filterForm.querySelector(`#housing-price`);
  const filterRoomsInput = filterForm.querySelector(`#housing-rooms`);
  const filterGuestsInput = filterForm.querySelector(`#housing-guests`);

  const checkType = (type) => {
    return filterTypeInput.value === ANY_INPUT_VALUE || filterTypeInput.value === type;
  };

  const checkPrice = (price) => {
    switch (filterPriceInput.value) {

      case Price.LOW:
        return price < PRICE_MIN_LIMIT;

      case Price.MIDDLE:
        return price >= PRICE_MIN_LIMIT && price <= PRICE_MAX_LIMIT;

      case Price.HIGH:
        return price > PRICE_MAX_LIMIT;

      case Price.ANY:
        return true;

      default:
        return true;
    }
  };

  const checkGuests = (guestsQuantity) => {
    return filterGuestsInput.value === ANY_INPUT_VALUE || parseInt(filterGuestsInput.value, 10) === guestsQuantity;
  };

  const checkRooms = (roomsQuantity) => {
    return filterRoomsInput.value === ANY_INPUT_VALUE || parseInt(filterRoomsInput.value, 10) === roomsQuantity;
  };

  const checkFeatures = (features) => {
    const checkedFilterFeaturesElements = document.querySelectorAll(`.map__checkbox:checked`);
    const checkedFilterFeaturesElementsArray = Array.from(checkedFilterFeaturesElements);
    return checkedFilterFeaturesElementsArray.every((featureElement) => {
      const index = features.findIndex((feature) => feature === featureElement.value);
      return index >= 0;
    });
  };

  const filterAdvert = () => {
    let filteredAdverts = [];
    const adverts = window.map.getAdverts();
    for (const advert of adverts) {
      if (
        advert.offer &&
        checkType(advert.offer.type)
        && checkPrice(advert.offer.price)
        && checkRooms(advert.offer.rooms)
        && checkGuests(advert.offer.guests)
        && checkFeatures(advert.offer.features)
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

  const onFilterPinsDebounce = window.util.debounce(filterPins);

  filterForm.addEventListener(`change`, onFilterPinsDebounce);

  window.filter = {
    form: filterForm
  };
})();
