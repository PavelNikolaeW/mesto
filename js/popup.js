let popupLinks = document.querySelectorAll('.popup-link');
let personName = document.querySelector('.person__name');
let subText = document.querySelector('.person__subtext');
let popupCloses = document.querySelectorAll('.close-popup');
let popupForm = document.querySelector('.popup__form');
let formSubmit = popupForm.querySelector('.popup__submit');
let prfixPopup = 'popup-';
let isOpen = false;

if (popupLinks.length > 0) {
    for (let i = 0; i < popupLinks.length; i++) {
        let link = popupLinks[i];
        link.addEventListener('click', function(e) {
            let popupId = link.getAttribute('id');
            let popup = document.getElementById(prfixPopup + popupId);
            let popupName = popup.querySelector('.name');
            let popupSubTexet = popup.querySelector('.subtext');
            if (popupName != null) {
                popupName.setAttribute('value', personName.textContent);
            }
            if (popupSubTexet != null) {
                popupSubTexet.setAttribute('value', subText.textContent);
            }
            popup.classList.add('open');
            e.preventDefault()
            isOpen = true;
        })
    }
}

if (popupCloses.length > 0) {
    for (let i = 0; i < popupCloses.length; i++) {
        let close = popupCloses[i];
        close.addEventListener('click', function(e) {
            let popup = close.closest('.popup')
            popup.classList.remove('open');
            e.preventDefault();
            isOpen = false;
        })
    }
}

function popupFormSubmit(evt) {
    let inputName = popupForm.querySelector('.name');
    let inputSubText = popupForm.querySelector('.subtext');
    personName.textContent = inputName.value;
    subText.textContent = inputSubText.value;
    let popup = popupForm.closest('.popup');
    popup.classList.remove('open');
    evt.preventDefault();
}

if (formSubmit != null) {
    formSubmit.addEventListener('click', popupFormSubmit);
}


document.onkeyup = function(e) {
    e = e || window.event;
    if (e.keyCode === 13 && isOpen) {
        popupFormSubmit(e);
    }
    return false;
}