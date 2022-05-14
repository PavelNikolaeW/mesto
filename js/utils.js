const nameInput = document.querySelector('.popup__input_type_name');
const subTextInput = document.querySelector('.popup__input_type_subtext');
const nameProfile = document.querySelector('.person__name');
const subTextProfile = document.querySelector('.person__subtext');
const popupCard = document.querySelector('.popup_card');
const popupImg = popupCard.querySelector('.popup__img');
const popupCaption = popupCard.querySelector('.popup__caption');
const ESC_CODE = 'Escape'

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


export {
    popupCard,
    subTextProfile,
    nameProfile,
    subTextInput,
    nameInput,
    closePopup,
    openPopup,
    openPopupProfile,
    popupImg,
    popupCaption
}