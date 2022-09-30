import { html, css, LitElement } from 'lit';

class PopupCard extends LitElement {
    static styles = css`
        :host {
            position: absolute;
            transition: all 300ms linear;
            width: 100%;
            height: 100%;
            border: 1px solid rgb(228, 228, 231);
			box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px;
			background-color: #fff;
			border-radius: 8px;
        }
    `

    static properties = {
        title: {
            type: String
        }
    }
    constructor(opts) {
        super();
        this.title = 'hello world';
        // console.log(opts)
    }
    render() {
        return html`
            <div class="test">${this.title}</div>
        `
    }
}

customElements.define('popup-card', PopupCard);
