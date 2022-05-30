export default class Section {
    constructor({ items, renderer }, ElementSelector) {
        this._items = items;
        this._renderer = renderer;
        this._section = document.querySelector(ElementSelector);
    }

    addItem(item) {
        this._section.append(item);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        })
    }
}