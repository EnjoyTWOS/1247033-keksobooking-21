"use strict";

(() => {
  const URL_DATA = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_FORM = `https://21.javascript.pages.academy/keksobooking`;
  const successMessageTemplate = document.querySelector(`#success`).content;
  const errorMessageTemplate = document.querySelector(`#error`).content;
  const main = document.querySelector(`main`);
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const renderErrorMessage = () => {
    const errorMessage = errorMessageTemplate.cloneNode(true);
    main.appendChild(errorMessage);

    const errorMessageClose = () => {
      document.querySelector(`.error`).remove();
    };

    const onErrorIsEsc = (evt) => {
      window.util.isEscapeEvent(evt, errorMessageClose);
    };

    const onEscRemoveListeners = (evt) => {
      window.util.isEscapeEvent(evt, onErrorRemoveListeners);
    };

    const onErrorRemoveListeners = () => {
      document.removeEventListener(`click`, errorMessageClose);
      document.removeEventListener(`keydown`, onErrorIsEsc);
    };

    document.addEventListener(`click`, errorMessageClose);
    document.addEventListener(`keydown`, onErrorIsEsc);
    document.addEventListener(`click`, () => {
      onErrorRemoveListeners();
    });
    document.addEventListener(`keydown`, onEscRemoveListeners);
  };

  const renderSuccessMessage = () => {
    const successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);

    const successMessageClose = () => {
      document.querySelector(`.success`).remove();
    };

    const onSuccessIsEsc = (evt) => {
      window.util.isEscapeEvent(evt, successMessageClose);
    };

    document.addEventListener(`click`, successMessageClose);
    document.addEventListener(`keydown`, onSuccessIsEsc);

    const onEscRemoveListeners = (evt) => {
      window.util.isEscapeEvent(evt, onSuccessRemoveListeners);
    };

    const onSuccessRemoveListeners = () => {
      document.removeEventListener(`click`, successMessageClose);
      document.removeEventListener(`keydown`, onSuccessIsEsc);
    };

    document.addEventListener(`click`, successMessageClose);
    document.addEventListener(`keydown`, onSuccessIsEsc);
    document.addEventListener(`click`, () => {
      onSuccessRemoveListeners();
    });
    document.addEventListener(`keydown`, onEscRemoveListeners);
  };

  window.backend = {
    load(onLoad, onError) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      });
      xhr.addEventListener(`error`, () => {
        onError(`Произошла ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, () => {
        onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(`GET`, URL_DATA);
      xhr.send();
    },
    save(data, onLoad, onError) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
          renderSuccessMessage();
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
          renderErrorMessage();
        }
      });

      xhr.addEventListener(`error`, () => {
        onError(`Произошла ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, () => {
        onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(`POST`, URL_FORM);
      xhr.send(data);
    }
  };
})();
