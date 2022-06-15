export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._userName = document.querySelector(nameSelector);
        this._userAbout = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserId() { return this._userId; }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            about: this._userAbout.textContent
        }
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
        this._avatar.src = avatar;
        this._userId = _id;
    }
}