import '../pages/index.css'

import { initialCards } from './initialCards.js';
import {
    subTextProfile,
    nameProfile,
    subTextInput,
    nameInput,
    closePopup,
    openPopup,
    openPopupProfile,
} from './utils.js';

import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import Section from './Section.js';
import UserInfo from './UserInfo.js';


const closePopupButtonList = document.querySelectorAll('.popup__close');
const buttonPopupEdit = document.querySelector('#edit');
const popupEdit = document.querySelector('#popup-edit')
const buttonPopupAdd = document.querySelector('#add');
const popupAdd = document.querySelector('#popup-add');
const cardList = document.querySelector('.cards__list');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const editFormElem = document.querySelector('[name="editForm"]');
const addFormElem = document.querySelector('[name="addForm"]');
const validConfig = {
    btnSelector: '.popup__submit',
    btnDisabledClass: 'popup__submit_type_disabled',
    errorElementSelector: '.popup__input-error',
    inputErrorClass: 'form__input_type_error',
}

const editFormValidator = new FormValidator(validConfig, editFormElem);
const addImageFormValodator = new FormValidator(validConfig, addFormElem);
editFormValidator.enableValidation();
addImageFormValodator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_card');
const popupWithFormEdit = new PopupWithForm('#popup-edit', handleProfileFormSubmit);
const popupWithFormAdd = new PopupWithForm('#popup-add', handleAddImageForm);
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithImage.setEventListeners();

const sectionCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item);
        sectionCardList.addItem(card.getElement());
    }
}, '.cards__list');
sectionCardList.renderItems();

const userInfo = new UserInfo({
    nameSelector: '.person__name',
    aboutSelector: '.person__subtext'
});

buttonPopupEdit.addEventListener('click', () => {
    const info = userInfo.getUserInfo()
    nameInput.value = info.uesrName;
    subTextInput.value = info.userAbout;
    openPopupProfile(popupEdit);
    editFormValidator.resetValidation();
})

buttonPopupAdd.addEventListener('click', () => {
    addImageFormValodator.resetValidation();
    openPopup(popupAdd);
})

function createCard(data) {
    return new Card({
        name: data.name,
        link: data.link,
        handleCardClick: (data) => {
            popupWithImage.open(data);
        }
    }, '#template-card');
}

function handleAddImageForm(evt) {
    const data = {
        name: inputTitle.value,
        link: inputLink.value,
    }
    const card = createCard(data);
    cardList.prepend(card.getElement());
    closePopup(popupAdd);
    addFormElem.reset();
}

function handleProfileFormSubmit(evt) {
    userInfo.setUserInfo({
        name: nameInput.value,
        info: subTextInput.value
    })
    closePopup(popupEdit);
}