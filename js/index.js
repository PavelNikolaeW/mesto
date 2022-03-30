function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    nameProfile.textContent = nameInput.value;
    subTextProfile.textContent = subTextInput.value;
    togglePopup(evt);
}

function togglePopup(evt) {
    evt.preventDefault();

    // делаем максимально тупое, ненужное присвоение, ведь все и так работает
    if (!popup.classList.contains("popup_opened")) {
        nameInput.value = nameProfile.innerText;
        subTextInput.value = subTextProfile.innerText;
    }
    // конец максимально тупого присвоения, оно тут ненужно

    popup.classList.toggle('popup_opened');
}

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let subTextInput = formElement.querySelector('.popup__input_type_subtext');

let nameProfile = document.querySelector('.person__name');
let subTextProfile = document.querySelector('.person__subtext');

nameInput.value = nameProfile.innerText;
subTextInput.value = subTextProfile.innerText;

let personButton = document.querySelector('.person__button');
let popup = document.querySelector('.popup');
let closePopup = popup.querySelector('.popup__close');


personButton.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);