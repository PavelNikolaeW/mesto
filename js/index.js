// put content
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const template = document.querySelector('#template-card').content;
const cardList = document.querySelector('.cards__list');

function createCard(cardData) {
    const cardElement = template.querySelector('.card').cloneNode(true);
    const cardPopup = template.querySelector('.popup').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__img');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__button');
    const cardRemove = cardElement.querySelector('.card__urn');

    cardRemove.addEventListener('click', () => {
        cardRemove.parentElement.remove();
        cardPopup.remove();
    })

    cardLike.addEventListener('click', () => {
        console.log('kek');
        cardLike.classList.toggle('card__button_type_active');
    })

    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardTitle.innerText = cardData.name;
    cardList.prepend(cardElement);
    createCardPopup(cardData, cardPopup, cardElement.querySelector('.card__img'));
}

function createCardPopup(cardData, cardPopup, cardElement) {
    const popupImg = cardPopup.querySelector('.popup__img');
    const popupCaption = cardPopup.querySelector('.popup__caption');
    const popupClose = cardPopup.querySelector('.close-popup');

    popupImg.src = cardData.link;
    popupImg.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    cardList.append(cardPopup);
    cardElement.addEventListener('click', () => {
        cardPopup.classList.toggle('popup_opened');
        cardPopup.style.background = 'rgba(0, 0, 0, 0.9)';
    })
    popupClose.addEventListener('click', closePopup)
}

for (const card of initialCards) {
    createCard(card);
}

// open popups
const nameInput = document.querySelector('.popup__input_type_name');
const subTextInput = document.querySelector('.popup__input_type_subtext');
const nameProfile = document.querySelector('.person__name');
const subTextProfile = document.querySelector('.person__subtext');

nameInput.value = nameProfile.innerText;
subTextInput.value = subTextProfile.innerText;

const popupButtons = document.querySelectorAll('.popup-link');
for (const button of popupButtons) {
    button.addEventListener('click', () => {
        const popupId = '#popup-' + button.getAttribute('id');
        const popup = document.querySelector(popupId);
        popup.classList.add('popup_opened');
    })
}

// close popups
function closePopup(evt) {
    const popup = evt.target.closest('.popup');
    popup.classList.remove('popup_opened')
}

// submit 
const submitManager = {
    addForm(evt) {
        const form = evt.target;
        const popup = form.closest('.popup');
        const card = {
            name: form.querySelector('.popup__input_type_title').value,
            link: form.querySelector('.popup__input_type_link').value,
        }

        createCard(card);
        popup.classList.remove('popup_opened')
        form.reset();
        evt.preventDefault();
    },
    editForm(evt) {
        const popup = evt.target.closest('.popup');
        nameProfile.textContent = nameInput.value;
        subTextProfile.textContent = subTextInput.value;

        popup.classList.remove('popup_opened');
        evt.preventDefault();
    },
}

const popupForms = document.querySelectorAll('.popup__form');
for (const form of popupForms) {
    const funcName = form.getAttribute('name');
    form.addEventListener('submit', submitManager[funcName]);
}