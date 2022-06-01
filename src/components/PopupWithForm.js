import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._form.querySelector('.popup__submit');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this.formValues = {};
    }

    _getInputValues() {
        this._inputs.forEach(input => { this.formValues[input.name] = input.value });
    }

    getInputValues() {
        this._getInputValues()
        return this.formValues;
    }

    setInputValues(values) {
        this._inputs.forEach(input => input.value = values[input.name])
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit();
        })
    }

    close() {
        this._form.reset();
        super.close();
    }
}