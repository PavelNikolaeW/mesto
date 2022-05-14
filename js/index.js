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

for (const data of initialCards) {
    const card = createCard(data);
    cardList.prepend(card.getElement());
}
for (const btn of closePopupButtonList) {
    btn.addEventListener('click', () => {
        const popup = btn.closest('.popup');
        closePopup(popup);
    })
}

buttonPopupEdit.addEventListener('click', () => {
    openPopupProfile(popupEdit);
    editFormValidator.resetValidation();
})

buttonPopupAdd.addEventListener('click', () => {
    openPopup(popupAdd);
    nameInput.value = nameProfile.textContent;
    subTextInput.value = subTextProfile.textContent;
})

editFormElem.addEventListener('submit', editForm);
addFormElem.addEventListener('submit', addImageForm);

function createCard(data) {
    return new Card(data, '#template-card');
}

function addImageForm(evt) {
    const data = {
        name: inputTitle.value,
        link: inputLink.value,
    }
    const card = createCard(data);
    cardList.prepend(card.getElement());
    closePopup(popupAdd);
    addFormElem.reset();
}

function editForm(evt) {
    nameProfile.textContent = nameInput.value;
    subTextProfile.textContent = subTextInput.value;
    closePopup(popupEdit);
}