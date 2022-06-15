import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._form.querySelector('.popup__submit');
        this._handleFormSubmit = handleFormSubmit;
    }

    open(cardId) {
        super.open();
        this._popup.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit(cardId);
            super.close();
        })
    }

    loading(status) {
        if (status)
            this._button.textContent = 'Сохранение...';
        else
            this._button.textContent = 'Сохраненить';
    }
}