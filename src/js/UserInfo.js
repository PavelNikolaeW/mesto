export default class UserInfo {
    constructor({ nameSelector, aboutSelector }, ) {
        this._userName = document.querySelector(nameSelector);
        this._userAbout = document.querySelector(aboutSelector);

    }

    getUserInfo() {
        return {
            uesrName: this._userName.textContent,
            userAbout: this._userAbout.textContent
        }
    }

    setUserInfo({ name, info }) {
        this._userName.textContent = name;
        this._userAbout.textContent = info;
    }
}