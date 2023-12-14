const checkValid = (inputList) => inputList.some((input) => !input.validity.valid);

function showInputError(formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const button = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      disabledButton(inputList, button, validationConfig);
    });
  });
}

function disabledButton(input, button, validationConfig) {
  if (checkValid(input)) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const button = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((input) => {
    hideInputError(formElement, input, validationConfig);
  })
  disabledButton(inputList, button, validationConfig);
}

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

/* 

Привет, ревьеюр :)

Я знаю, что мой код плохой, но я, правда, стараюсь!

Здесь я просто поздравляю Вас с наступающим праздником, с наступающим новым 2024 годом!
Желаю Вам всего самого наилучшего, чего только возможно :)

Кстати, вот Вам елка, пользуйтесь. :

                              1
                             101
                            10101
                           1010101
                          101010101
                         10101010101
                        1010101010101
                              0

*/