export default class FormValidator {
    constructor(cfg, formElement) {
        this.formElement = formElement;
        this._btnSelector = cfg.btnSelector;
        this._btnDisabledClass = cfg.btnDisabledClass;
        this._errorElementSelector = cfg.errorElementSelector;
        this._inputErrorClass = cfg.inputErrorClass;
    }

    _hasInvalidInput(formElemCollection) {
        return Array.from(formElemCollection).some(inputElem => {
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

    _toggleDisabledButton(formElemCollection, btn) {
        if (!this._hasInvalidInput(formElemCollection)) {
            btn.classList.remove(this._btnDisabledClass);
            btn.removeAttribute("disabled");
        } else {
            btn.setAttribute("disabled", "disabled");
            btn.classList.add(this._btnDisabledClass);
        }
    }

    _setEventListeners(inputElement, btn, formElemCollection) {
        this._toggleDisabledButton(formElemCollection, btn);
        inputElement.addEventListener('input', (evt) => {
            this._checkInputValidity(inputElement);
            this._toggleDisabledButton(formElemCollection, btn);
        })
    }

    enableValidation() {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        const formElemCollection = this.formElement.elements;
        const btn = this.formElement.querySelector(this._btnSelector)
        for (const fildElement of formElemCollection) {
            if (fildElement.tagName == "INPUT") {
                this._setEventListeners(fildElement, btn, formElemCollection);
            }
        }
    }
}