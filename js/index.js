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
const editFormElem = document.querySelector('[name="editForm"]')
const addFormElem = document.querySelector('[name="addForm"]')
const btnSubmitAddForm = addFormElem.querySelector('.popup__submit')

function addForm(evt) {
    const data = {
        name: inputTitle.value,
        link: inputLink.value,
    }
    const card = new Card(data, '#template-card');
    cardList.prepend(card.getElement());
    closePopup(popupAdd)
    btnSubmitAddForm.setAttribute("disabled", "disabled");
    btnSubmitAddForm.classList.add('popup__submit_type_disabled');
    addFormElem.reset()
}

function editForm(evt) {
    nameProfile.textContent = nameInput.value;
    subTextProfile.textContent = subTextInput.value;
    closePopup(popupEdit)
}

function main() {
    for (const data of initialCards) {
        const card = new Card(data, '#template-card');
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
    })
    buttonPopupAdd.addEventListener('click', () => {
        openPopup(popupAdd);
    })
    editFormElem.addEventListener('submit', editForm);
    addFormElem.addEventListener('submit', addForm);
    nameInput.value = nameProfile.textContent;
    subTextInput.value = subTextProfile.textContent;
    const validConfig = {
        btnSelector: '.popup__submit',
        btnDisabledClass: 'popup__submit_type_disabled',
        errorElementSelector: '.popup__input-error',
        inputErrorClass: 'form__input_type_error',
    }
    Array.from(document.forms).forEach(item => {
        new FormValidator(validConfig, item).enableValidation();
    })
}

main();