const closePopupButtonList = document.querySelectorAll('.popup__close');
const buttonPopupEdit = document.querySelector('#edit');
const popupEdit = document.querySelector('#popup-edit')
const buttonPopupAdd = document.querySelector('#add');
const popupAdd = document.querySelector('#popup-add');
const template = document.querySelector('#template-card').content;
const cardList = document.querySelector('.cards__list');
const popupCard = document.querySelector('.popup_card');
const popupImg = popupCard.querySelector('.popup__img');
const popupCaption = popupCard.querySelector('.popup__caption');
const nameInput = document.querySelector('.popup__input_type_name');
const subTextInput = document.querySelector('.popup__input_type_subtext');
const nameProfile = document.querySelector('.person__name');
const subTextProfile = document.querySelector('.person__subtext');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const editFormElem = document.querySelector('[name="editForm"]')
const addFormElem = document.querySelector('[name="addForm"]')
const btnSubmitAddForm = addFormElem.querySelector('.popup__submit')
const ESC_CODE = 'Escape'

function createCard(cardData) {
    const cardElement = template.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__img');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__button');
    const cardRemove = cardElement.querySelector('.card__urn');

    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardRemove.addEventListener('click', () => {
        cardRemove.closest('.card').remove();
    })
    cardLike.addEventListener('click', () => {
        cardLike.classList.toggle('card__button_type_active');
    })
    cardImg.addEventListener('click', () => {
        openPopup(popupCard)
        popupImg.src = cardImg.src;
        popupImg.alt = cardImg.alt;
        popupCaption.textContent = cardImg.alt;
    })
    return cardElement;
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscPopup)
    document.removeEventListener('mousedown', closeByOverlayClick)
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscPopup);
    document.addEventListener('mousedown', closeByOverlayClick)
}

function openPopupProfile(popup) {
    nameInput.value = nameProfile.textContent;
    subTextInput.value = subTextProfile.textContent;
    openPopup(popup);
}

function closeByEscPopup(evt) {
    if (evt.key === ESC_CODE) {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

function closeByOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

function addForm(evt) {
    const card = {
        name: inputTitle.value,
        link: inputLink.value,
    }
    cardList.prepend(createCard(card));
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
    for (const card of initialCards) {
        cardList.prepend(createCard(card));
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
    enableValidation({
        formCollection: document.forms,
        bntSelector: '.popup__submit',
        btnDisabledClass: 'popup__submit_type_disabled',
        errorElementSelector: '.popup__input-error',
        inputErrorClass: 'form__input_type_error',
    })
}

main();