function hasInvalidInput(formElemCollection) {
    return Array.from(formElemCollection).some(inputElem => {
        return !inputElem.validity.valid;
    })
}

function toggleDisabledButton(formElemCollection, btn, cfg) {
    if (!hasInvalidInput(formElemCollection)) {
        btn.classList.remove(cfg.btnDisabledClass);
        btn.removeAttribute("disabled");
    } else {
        btn.setAttribute("disabled", "disabled");
        btn.classList.add(cfg.btnDisabledClass);
    }
}

function showInputError(inputElement, cfg) {
    const errorElement = inputElement.parentNode.querySelector(cfg.errorElementSelector)
    errorElement.textContent = inputElement.validationMessage
    inputElement.classList.add(cfg.inputErrorClass);
}

function hideInputError(inputElement, cfg) {
    const errorElement = inputElement.parentNode.querySelector(cfg.errorElementSelector)
    errorElement.textContent = ''
    inputElement.classList.remove(cfg.inputErrorClass);
}

function checkInputValidity(inputElement, cfg) {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, cfg);
    } else {
        hideInputError(inputElement, cfg);
    }
}

function setEventListeners(inputElement, btn, formElemCollection, cfg) {
    toggleDisabledButton(formElemCollection, btn, cfg);
    inputElement.addEventListener('input', (evt) => {
        checkInputValidity(inputElement, cfg);
        toggleDisabledButton(formElemCollection, btn, cfg);
    })
}

function enableValidation(cfg) {
    for (const formElement of cfg.formCollection) {
        formElement.addEventListener('submit', (evt) => {
            toggleDisabledButton(formElemCollection, btn, cfg)
            evt.preventDefault();
        });
        formElemCollection = formElement.elements;
        const btn = formElement.querySelector(cfg.bntSelector)
        for (const fildElement of formElemCollection) {
            if (fildElement.tagName == "INPUT") {
                setEventListeners(fildElement, btn, formElemCollection, cfg);
            }
        }
    }
}