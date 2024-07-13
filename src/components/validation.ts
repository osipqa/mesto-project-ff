interface ValidationConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
  formSelector: string;
}

const checkValid = (inputList: HTMLInputElement[]): boolean =>
  inputList.some((input) => !input.validity.valid);

function showInputError(
  formElement: HTMLFormElement,
  inputElement: HTMLInputElement,
  errorMessage: string,
  { inputErrorClass, errorClass }: ValidationConfig
): void {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`) as HTMLElement;
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(
  formElement: HTMLFormElement,
  inputElement: HTMLInputElement,
  { inputErrorClass, errorClass }: ValidationConfig
): void {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`) as HTMLElement;
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function isValid(
  formElement: HTMLFormElement,
  inputElement: HTMLInputElement,
  validationConfig: ValidationConfig
): void {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage || '');
  } else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function setEventListeners(
  formElement: HTMLFormElement,
  validationConfig: ValidationConfig
): void {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  ) as HTMLInputElement[];
  const button = formElement.querySelector(validationConfig.submitButtonSelector) as HTMLButtonElement;
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      disabledButton(inputList, button, validationConfig);
    });
  });
}

function disabledButton(
  inputList: HTMLInputElement[],
  button: HTMLButtonElement,
  validationConfig: ValidationConfig
): void {
  if (checkValid(inputList)) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
}

export function clearValidation(
  formElement: HTMLFormElement,
  validationConfig: ValidationConfig
): void {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  ) as HTMLInputElement[];
  const button = formElement.querySelector(validationConfig.submitButtonSelector) as HTMLButtonElement;
  inputList.forEach((input) => {
    hideInputError(formElement, input, validationConfig);
  });
  disabledButton(inputList, button, validationConfig);
}

export function enableValidation(validationConfig: ValidationConfig): void {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  ) as HTMLFormElement[];
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}