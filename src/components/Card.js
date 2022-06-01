export default class Card {
    constructor({ name, link }, handleCardClick, selector) {
        this._name = name;
        this._link = link;
        this._handleCardClick = handleCardClick
        this._cardElement = this._getCardElement(selector);
        this._cardImg = this._cardElement.querySelector('.card__img');
        this._cardRemove = this._cardElement.querySelector('.card__urn');
        this._cardLike = this._cardElement.querySelector('.card__button');
        this._createCard()
    }

    _getCardElement(selector) {
        return document
            .querySelector(selector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    _handleRemove() {
        this._cardRemove.addEventListener('click', () => {
            this._cardElement.remove();
        })
    }

    _handleLiked() {
        this._cardLike.addEventListener('click', () => {
            this._cardLike.classList.toggle('card__button_type_active');
        })
    }

    _setEventListeners() {
        this._handleRemove();
        this._handleLiked();
        this._cardImg.addEventListener('click', () => {
            this._handleCardClick({
                name: this._name,
                link: this._link
            });
        })
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