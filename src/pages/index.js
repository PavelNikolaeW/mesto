import '../pages/index.css'

import { initialCards } from '../utils/initialCards.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

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


const buttonPopupEdit = document.querySelector('#edit');

buttonPopupEdit.addEventListener('click', () => {
    popupWithFormEdit.setInputValues(userInfo.getUserInfo());
    popupWithFormEdit.open();
    editFormValidator.resetValidation();
})

const buttonPopupAdd = document.querySelector('#add');

buttonPopupAdd.addEventListener('click', () => {
    addImageFormValodator.resetValidation();
    popupWithFormAdd.open();
})

function createCard(data) {
    return new Card(
        data,
        data => popupWithImage.open(data),
        '#template-card');
}

function handleAddImageForm(inputsValues) {
    const card = createCard(inputsValues);
    sectionCardList.addItem(card.getElement());
    popupWithFormAdd.close();
    addImageFormValodator.resetValidation();
}

function handleProfileFormSubmit(inputsValues) {
    userInfo.setUserInfo(inputsValues);
    popupWithFormEdit.close();
    editFormValidator.resetValidation();
}