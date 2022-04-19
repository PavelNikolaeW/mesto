function openCardPopup(cardImg) {
    popupImg.src = cardImg.src;
    popupImg.alt = cardImg.alt;
    popupCaption.textContent = cardImg.alt;
    popupCard.classList.add('popup_opened');
}

function createCard(cardData) {
    const cardElement = template.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__img');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLike = cardElement.querySelector('.card__button');
    const cardRemove = cardElement.querySelector('.card__urn');

    cardRemove.addEventListener('click', () => {
        cardRemove.closest('.card').remove();
    })

    cardLike.addEventListener('click', () => {
        cardLike.classList.toggle('card__button_type_active');
    })

    cardImg.addEventListener('click', () => {
        openCardPopup(cardImg);
    })

    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    return cardElement;
}
const template = document.querySelector('#template-card').content;
const cardList = document.querySelector('.cards__list');
const popupCard = document.querySelector('.popup_card');
const popupImg = popupCard.querySelector('.popup__img');
const popupCaption = popupCard.querySelector('.popup__caption');
const nameInput = document.querySelector('.popup__input_type_name');
const subTextInput = document.querySelector('.popup__input_type_subtext');
const nameProfile = document.querySelector('.person__name');
const subTextProfile = document.querySelector('.person__subtext');
const popupForms = document.querySelectorAll('.popup__form');
const popupButtons = document.querySelectorAll('.popup-link');
const PopupCloses = document.querySelectorAll('.popup__close')
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');
const submitManager = {
    addForm(evt) {
        const popup = evt.target.closest('.popup');
        const card = {
            name: inputTitle.value,
            link: inputLink.value,
        }

        cardList.prepend(createCard(card));
        popup.classList.remove('popup_opened');
        evt.target.reset();
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

function main() {
    for (const card of initialCards) {
        cardList.prepend(createCard(card));
    }
    nameInput.value = nameProfile.textContent;
    subTextInput.value = subTextProfile.textContent;

    // open popup
    for (const button of popupButtons) {
        button.addEventListener('click', () => {
            const popupId = '#popup-' + button.getAttribute('id');
            const popup = document.querySelector(popupId);
            popup.classList.add('popup_opened');
        })
    }

    // close popups
    for (const item of PopupCloses) {
        item.addEventListener('click', () => {
            const popup = item.closest('.popup');
            popup.classList.remove('popup_opened');
        })
    }

    // submit 
    for (const form of popupForms) {
        const funcName = form.getAttribute('name');
        form.addEventListener('submit', submitManager[funcName]);
    }
}

main();