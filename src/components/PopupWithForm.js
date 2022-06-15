import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._form.querySelector('.popup__submit');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        this.inputsValues = {};
    }

    loading(status) {
        if (status)
            this._button.textContent = 'Сохранение...';
        else
            this._button.textContent = 'Сохраненить';
    }

    _getInputValues() {
        this._inputs.forEach(input => { this.inputsValues[input.name] = input.value });
        return this.inputsValues;
    }

    setInputValues(values) {
        this._inputs.forEach(input => input.value = values[input.name])
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        this._form.reset();
        super.close();
    }
}