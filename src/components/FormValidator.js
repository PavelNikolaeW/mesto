export default class FormValidator {
    constructor(cfg, formElement) {
        this._formElement = formElement;
        this._btnSelector = cfg.btnSelector;
        this._btnDisabledClass = cfg.btnDisabledClass;
        this._errorElementSelector = cfg.errorElementSelector;
        this._inputErrorClass = cfg.inputErrorClass;
        this._formElemList = Array.from(this._formElement.elements);
        this._submitButton = this._formElement.querySelector(this._btnSelector)
    }

    _hasInvalidInput() {
        return this._formElemList.some(inputElem => {
            return !inputElem.validity.valid;
        })
    }

    _showInputError(inputElement) {
        const errorElement = inputElement.parentNode.querySelector(this._errorElementSelector)
        errorElement.textContent = inputElement.validationMessage
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = inputElement.parentNode.querySelector(this._errorElementSelector)
        errorElement.textContent = ''
        inputElement.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState() {
        if (!this._hasInvalidInput()) {
            this._submitButton.classList.remove(this._btnDisabledClass);
            this._submitButton.removeAttribute("disabled");
        } else {
            this._submitButton.setAttribute("disabled", "disabled");
            this._submitButton.classList.add(this._btnDisabledClass);
        }
    }

    _setEventListeners(inputElement) {
        this._toggleButtonState();

        inputElement.addEventListener('input', (evt) => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        })
    }

    resetValidation() {
        this._toggleButtonState();

        this._formElemList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

    }

    enableValidation() {
        for (const fildElement of this._formElemList) {
            if (fildElement.tagName == "INPUT") {
                this._setEventListeners(fildElement);
            }
        }
    }
}