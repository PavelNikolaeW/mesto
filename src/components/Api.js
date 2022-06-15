export default class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
        this._myUser = '/users/me';
        this._avatar = '/users/me/avatar';
        this._cards = '/cards';
        this._like = '/likes';
    }

    _checkResponse(res) {
        if (res.ok)
            return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getData(listPromises) {
        return Promise.all(listPromises);
    }

    getUserInfo(path = this._myUser) {
        return fetch(this._url + path, {
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    setUserInfo(newInfo, path = this._myUser) {
        console.log(newInfo);
        return fetch(this._url + path, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify(newInfo)
            })
            .then(this._checkResponse);
    }

    getInitialCards(path = this._cards) {
        return fetch(this._url + path, {
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    addCard(cardData, path = this._cards) {
        return fetch(this._url + path, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify(cardData)
            })
            .then(this._checkResponse);
    }

    deleteCard(cardId, path = this._cards) {
        return fetch(`${this._url}${path}/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._checkResponse)
    }

    addLike(cardId, path = this._cards, like = this._like) {
        return fetch(`${this._url}${path}/${cardId}${this._like}`, {
            method: "PUT",
            headers: this._headers
        }).then(this._checkResponse)
    }

    deleteLike(cardId, path = this._cards, like = this._like) {
        return fetch(`${this._url}${path}/${cardId}${this._like}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._checkResponse)
    }

    changeAvatar(avatar, path = this._avatar) {
        return fetch(this._url + path, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar)
        }).then(this._checkResponse)
    }
}