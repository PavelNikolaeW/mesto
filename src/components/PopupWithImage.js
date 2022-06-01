import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._figure = document.querySelector('.popup__figure');
        this._image = this._figure.querySelector('.popup__img');
        this._caption = this._figure.querySelector('.popup__caption');
    }

    open({ link, name }) {
        this._image.src = link;
        this._image.alt = name;
        this._caption.textContent = name;
        super.open();
    }
}