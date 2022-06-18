export default class Section {
    constructor({ renderer }, elementSelector) {
        this._renderer = renderer;
        this._section = document.querySelector(elementSelector);
    }

    addItem(item) {
        this._section.prepend(item);
    }

    renderItems(items, userId) {
        items.forEach(item => {
            this._renderer(item, userId);
        })
    }
}