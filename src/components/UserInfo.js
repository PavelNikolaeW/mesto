export default class UserInfo {
    constructor({ nameSelector, aboutSelector }, ) {
        this._userName = document.querySelector(nameSelector);
        this._userAbout = document.querySelector(aboutSelector);

    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            subtext: this._userAbout.textContent
        }
    }

    setUserInfo({ name, subtext }) {
        this._userName.textContent = name;
        this._userAbout.textContent = subtext;
    }
}