import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, HandleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = HandleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._form.querySelector('.popup__submit');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
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