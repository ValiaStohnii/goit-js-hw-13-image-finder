export default class LoadButton{
    constructor({ selector, hidden = false }) {
        this.refs = this.getRefs(selector);
        hidden && this.hide();
    }

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.label = refs.button.querySelector('.label');

        return refs;
    }

    hide() {
        this.refs.button.classList.add('is-hidden');
    }

    show() {
        this.refs.button.classList.remove('is-hidden');
    }

    enable() {
        this.refs.button.disabled = false;
        this.refs.label.textContent = 'Load more';
    }

    disable() {
        this.refs.button.disabled = true;
        this.refs.label.textContent = 'Load...';
    }
}