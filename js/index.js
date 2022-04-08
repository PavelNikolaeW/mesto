// put content
const template = document.querySelector('#template-card').content;
const cardsContainer = document.querySelector('.cards__list');
const popupCard = document.querySelector('.popup_card');
const popupImg = popupCard.querySelector('.popup__img');
const popupCaption = popupCard.querySelector('.popup__caption');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openCardPopup(cardImg) {
    popupImg.src = cardImg.src;
    popupImg.alt = cardImg.alt;
    popupCaption.textContent = cardImg.alt;
    openPopup(popupCard);
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

for (const card of initialCards) {
    cardsContainer.prepend(createCard(card));
}

// open popups
const nameInput = document.querySelector('.popup__input_type_name');
const subTextInput = document.querySelector('.popup__input_type_subtext');
const nameProfile = document.querySelector('.person__name');
const subTextProfile = document.querySelector('.person__subtext');

nameInput.value = nameProfile.textContent;
subTextInput.value = subTextProfile.textContent;


openPropfilePopup();

// слишком сложный участок кода
// const popupButtons = document.querySelectorAll('.popup-link');
// for (const button of popupButtons) {
//     button.addEventListener('click', () => {
//         const popupId = '#popup-' + button.getAttribute('id');
//         const popup = document.querySelector(popupId);
//         openPopup(popup)
//     })
// }
// сделаю все в ручную, а то в друг я запутаюсь, я же программист 

function openPropfilePopup() {
    // добавим бесполезный участок когда сюда, вдруг я сойду с ума и изменю еще каким то другим способом имя и подпись
    nameInput.value = nameProfile.textContent;
    subTextInput.value = subTextProfile.textContent;
    // конец бесполезного участка кода, он тут не нужен, зато это хорошая практика
    openPopup(popupEdit)
}

const buttonEdit = document.querySelector('#edit');
const popupEdit = document.querySelector('#popup-edit');

buttonEdit.addEventListener('click', () => {
    openPropfilePopup();
})

const buttonAdd = document.querySelector('#add');
const popupAdd = document.querySelector('#popup-add');

buttonAdd.addEventListener('click', () => {
        openPopup(popupAdd);
    })
    // теперь хорошо 


// close popups
const PopupCloses = document.querySelectorAll('.popup__close')
for (const item of PopupCloses) {
    item.addEventListener('click', () => {
        const popup = item.closest('.popup');
        closePopup(popup)
    })
}

// submit 
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');

// болит голова когда смотрю на это, заменю ка я все на функции, что бы
// установить каждый обработчик для каждой формы по отдельности
// const submitManager = {
//     addForm(evt) {
//         const popup = evt.target.closest('.popup');
//         const card = {
//             name: inputTitle.value,
//             link: inputLink.value,
//         }

//         cardsContainer.prepend(createCard(card));
//         closePopup(popup);
//         evt.target.reset();
//         evt.preventDefault();
//     },
//     editForm(evt) {
//         const popup = evt.target.closest('.popup');

//         nameProfile.textContent = nameInput.value;
//         subTextProfile.textContent = subTextInput.value;
//         closePopup(popup);
//         evt.preventDefault();
//     },
// }

// const popupForms = document.querySelectorAll('.popup__form');
// for (const form of popupForms) {
//     const funcName = form.getAttribute('name');
//     form.addEventListener('submit', submitManager[funcName]);
// }


function addForm(evt) {
    const popup = evt.target.closest('.popup');
    const card = {
        name: inputTitle.value,
        link: inputLink.value,
    }

    cardsContainer.prepend(createCard(card));
    closePopup(popup);
    evt.target.reset();
    evt.preventDefault();
}

function editForm(evt) {
    const popup = evt.target.closest('.popup');

    nameProfile.textContent = nameInput.value;
    subTextProfile.textContent = subTextInput.value;
    closePopup(popup);
    evt.preventDefault();
}

const formAdd = document.querySelector('.popup__form[name=addForm]');
formAdd.addEventListener('submit', addForm);

const formEdit = document.querySelector('.popup__form[name=editForm]');
formEdit.addEventListener('submit', editForm);