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

    const onErrorMessageClose = () => {
      document.querySelector(`.error`).remove();
      document.removeEventListener(`click`, onErrorMessageClose);
      document.removeEventListener(`keydown`, onEscClickErrorMessageClose);
    };

    const onEscClickErrorMessageClose = (evt) => {
      window.util.isEscapeEvent(evt, onErrorMessageClose);
    };

    document.addEventListener(`click`, onErrorMessageClose);
    document.addEventListener(`keydown`, onEscClickErrorMessageClose);
  };

  const renderSuccessMessage = () => {
    const successMessage = successMessageTemplate.cloneNode(true);
    main.appendChild(successMessage);

    const onSuccessMessageClose = () => {
      document.querySelector(`.success`).remove();
      document.removeEventListener(`click`, onSuccessMessageClose);
      document.removeEventListener(`keydown`, onEscClickSuccessMessageClose);
    };

    const onEscClickSuccessMessageClose = (evt) => {
      window.util.isEscapeEvent(evt, onSuccessMessageClose);
    };

    document.addEventListener(`click`, onSuccessMessageClose);
    document.addEventListener(`keydown`, onEscClickSuccessMessageClose);
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
          onError(renderErrorMessage());
        }
      });

      xhr.addEventListener(`error`, () => {
        onError(renderErrorMessage());
      });
      xhr.addEventListener(`timeout`, () => {
        onError(renderErrorMessage());
      });

      xhr.open(`POST`, URL_FORM);
      xhr.send(data);
    }
  };
})();
