import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._figure = document.querySelector('.popup__figure');
        this._image = document.querySelector('.popup__img');
        this._caption = document.querySelector('.popup__caption');
    }

    open(item) {
        this._image.src = item.link;
        this._image.alt = item.name;
        this._caption.textContent = item.name;
        super.open();
    }
}