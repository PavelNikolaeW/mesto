import { popupCard, popupImg, popupCaption, openPopup } from './utils.js';

export default class Card {
    constructor(data, selector) {
        this._name = data.name;
        this._link = data.link;
        this._cardElement = this._getCardElement(selector);
        this._cardImg = this._cardElement.querySelector('.card__img');
        this.cardRemove = this._cardElement.querySelector('.card__urn');
        this.cardLike = this._cardElement.querySelector('.card__button');
        this._createCard()
    }

    _getCardElement(selector) {
        return document
            .querySelector(selector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    _handleCardClick() {
        this._cardImg.addEventListener('click', () => {
            openPopup(popupCard);
            popupImg.src = this._cardImg.src;
            popupImg.alt = this._cardImg.alt;
            popupCaption.textContent = this._cardImg.alt;
        })
    }

    _handleRemove() {
        this.cardRemove.addEventListener('click', () => {
            cardRemove.closest('.card').remove();
        })
    }

    _handleLiked() {
        cardLike.addEventListener('click', () => {
            cardLike.classList.toggle('card__button_type_active');
        })
    }

    _setEventListeners() {
        this._handleRemove();
        this._handleLiked();
        this._handleCardClick();
    }

    _createCard() {
        const cardTitle = this._cardElement.querySelector('.card__title');

        this._setEventListeners()
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        cardTitle.textContent = this._name;
    }

    getElement() {
        return this._cardElement
    }
}