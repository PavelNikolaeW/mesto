import '../pages/index.css'

import Api from '../components/Api'
import FormValidator from '../components/FormValidator';
import Card from '../components/Card';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import PopupConfirm from '../components/PopupConfirm';
import Section from '../components/Section';
import UserInfo from '../components/UserInfo';

import { token } from '../utils/env';

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-43',
    headers: {
        authorization: token,
        'Content-Type': "application/json"
    }
});

const editFormElem = document.querySelector('[name="editForm"]');
const addFormElem = document.querySelector('[name="addForm"]');
const changeAvatarElem = document.querySelector('[name="changeAvatar"]');
const validConfig = {
    btnSelector: '.popup__submit',
    btnDisabledClass: 'popup__submit_type_disabled',
    errorElementSelector: '.popup__input-error',
    inputErrorClass: 'form__input_type_error',
}

const formEditValidator = new FormValidator(validConfig, editFormElem);
const formAddImageValodator = new FormValidator(validConfig, addFormElem);
const formChangeAvatarValodator = new FormValidator(validConfig, changeAvatarElem);

formEditValidator.enableValidation();
formAddImageValodator.enableValidation();
formChangeAvatarValodator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_card');
const popupWithFormEdit = new PopupWithForm('#popup-edit', handleProfileFormSubmit);
const popupWithFormAdd = new PopupWithForm('#popup-add', handleAddImageForm);
const popupConfirmDelete = new PopupConfirm('#popup-delete', handleConfirmDelete)
const popupWithAvatar = new PopupWithForm('#popup-avatar', handleChangeAvatar);

popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();
popupConfirmDelete.setEventListeners();
popupWithAvatar.setEventListeners();

const userInfo = new UserInfo({
    nameSelector: '.person__name',
    aboutSelector: '.person__subtext',
    avatarSelector: '.person__img'
});

const sectionCardList = new Section({
    renderer: (item, userId) => {
        const card = createCard(item, userId);
        sectionCardList.addItem(card);
    }
}, '.cards__list');


api.getData([api.getUserInfo(), api.getInitialCards()])
    .then((data) => {
        const [userData, cardList] = data;
        userInfo.setUserInfo(userData);
        sectionCardList.renderItems(cardList.reverse(), userInfo.getUserId());
    })
    .catch(err => console.log(err));

const buttonPopupEdit = document.querySelector('#edit');

buttonPopupEdit.addEventListener('click', () => {
    popupWithFormEdit.setInputValues(userInfo.getUserInfo());
    popupWithFormEdit.open();
    formEditValidator.resetValidation();
})

const buttonPopupAdd = document.querySelector('#add');

buttonPopupAdd.addEventListener('click', () => {
    formAddImageValodator.resetValidation();
    popupWithFormAdd.open();
})

const buttonChangeAvatar = document.querySelector('#avatar');

buttonChangeAvatar.addEventListener('click', () => {
    formChangeAvatarValodator.resetValidation();
    popupWithAvatar.open();
})

function createCard(data, userId) {
    const card = new Card(
        data,
        userId,
        data => popupWithImage.open(data),
        () => popupConfirmDelete.open(card.cardId, card.getElement()),
        (whoLiked, userId, cardId) => {
            if (whoLiked.find(user => user._id === userId)) {
                api.deleteLike(cardId)
                    .then(data => {
                        card._setLiked(false, data.likes);
                    })
                    .catch(err => console.log(err))
            } else {
                api.addLike(cardId)
                    .then((data) => {
                        card._setLiked(true, data.likes);
                    })
                    .catch(err => console.log(err))
            }
        },
        '#template-card');
    return card.getElement();
}

function handleAddImageForm(inputsValues) {
    this.loading(true);
    api.addCard(inputsValues)
        .then((data) => {
            const card = createCard(data, userInfo.getUserId());
            sectionCardList.addItem(card);
            popupWithFormAdd.close();
        })
        .catch(console.log)
        .finally(() => this.loading(false));
}

function handleProfileFormSubmit(inputsValues) {
    this.loading(true);
    api.setUserInfo(inputsValues)
        .then(data => {
            userInfo.setUserInfo(data);
            popupWithFormEdit.close();
        })
        .catch(err => console.log(err))
        .finally(() => this.loading(false));
}

function handleConfirmDelete(cardId, cardElement) {
    this.loading(true);
    api.deleteCard(cardId)
        .then(() => {
            cardElement.remove();
            popupConfirmDelete.close();
        })
        .catch(err => console.log(err))
        .finally(() => this.loading(false));
}

function handleChangeAvatar(inputsValues) {
    this.loading(true);
    api.changeAvatar(inputsValues)
        .then((data) => {
            popupWithAvatar.close();
            userInfo.setUserInfo(data);
        })
        .catch(err => console.log(err))
        .finally(() => this.loading(false));
}