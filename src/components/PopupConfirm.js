import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._button = this._form.querySelector('.popup__submit');
        this._handleFormSubmit = handleFormSubmit;
    }

    open(cardId, cardElement) {
        super.open();
        this._cardId = cardId;
        this._cardElement = cardElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit(this._cardId, this._cardElement);
        })
    }

    loading(status) {
        if (status)
            this._button.textContent = 'Удаление...';
        else
            this._button.textContent = 'Да';
    }
}