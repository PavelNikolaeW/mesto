function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    nameProfile.textContent = nameInput.value;
    subTextProfile.textContent = subTextInput.value;
    openClosePopup(evt);
}

function openClosePopup(evt) {
    console.log(popup);
    evt.preventDefault();
    popup.classList.toggle('popup_opened');
}


let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name');
let subTextInput = formElement.querySelector('.popup__input_subtext');

let nameProfile = document.querySelector('.person__name');
let subTextProfile = document.querySelector('.person__subtext');

nameInput.value = nameProfile.innerText;
subTextInput.value = subTextProfile.innerText;

let personButton = document.querySelector('.person__button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');


personButton.addEventListener('click', openClosePopup);
closePopup.addEventListener('click', openClosePopup);
formElement.addEventListener('submit', formSubmitHandler);