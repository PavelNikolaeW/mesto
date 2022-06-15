export default class Card {
    constructor(data, userId, handleCardClick, handleCardRemove, addLike, deleteLike, selector) {
        this._data = data;
        this._whoLiked = this._data.likes;
        this._ownerId = this._data.owner._id;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._handleRemove = handleCardRemove;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
        this._cardElement = this._getCardElement(selector);
        this.cardTitle = this._cardElement.querySelector('.card__title');
        this._cardImg = this._cardElement.querySelector('.card__img');
        this._cardRemove = this._cardElement.querySelector('.card__urn');
        this._cardLike = this._cardElement.querySelector('.card__button');
        this._likeCounter = this._cardElement.querySelector('.card__counter');
        this._createCard();
    }

    _getCardElement(selector) {
        return document
            .querySelector(selector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    }

    _handleLiked() {
        this._cardLike.addEventListener('click', () => {
            if (this._whoLiked.find(user => user._id === this._userId)) {
                this._deleteLike(this._data._id)
                    .then((data) => {
                        this._setLiked(false, data.likes);
                    })
                    .catch(err => console.log(err))
            } else {
                this._addLike(this._data._id)
                    .then(data => {
                        this._setLiked(true, data.likes);
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    _setEventListeners() {
        this._handleLiked();
        this._cardImg.addEventListener('click', () => {
            this._handleCardClick(this._data);
        })
        if (this._ownerId === this._userId)
            this._cardRemove.addEventListener('click', () => {
                this._handleRemove(this._data._id);
            });
        else
            this._cardRemove.style.display = 'none';
    }

    _createCard() {
        this._setEventListeners();
        this._cardImg.src = this._data.link;
        this._cardImg.alt = this._data.name;
        this._cardElement.id = this._data._id;
        this.cardTitle.textContent = this._data.name;
        this._likeCounter.textContent = this._whoLiked.length
        if (this._whoLiked.find(user => user._id === this._userId))
            this._cardLike.classList.add('card__button_type_active')
    }

    getElement() { return this._cardElement }

    _setLiked(isActive, whoLiked) {
        this._whoLiked = whoLiked;
        this._likeCounter.textContent = whoLiked.length
        if (isActive)
            this._cardLike.classList.add('card__button_type_active')
        else
            this._cardLike.classList.remove('card__button_type_active')
    }
}