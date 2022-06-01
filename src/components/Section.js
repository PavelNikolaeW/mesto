export default class Section {
    constructor({ items, renderer }, elementSelector) {
        this._items = items;
        this._renderer = renderer;
        this._section = document.querySelector(elementSelector);
    }

    addItem(item) {
        this._section.prepend(item);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        })
    }
}