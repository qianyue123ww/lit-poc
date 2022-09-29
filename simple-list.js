import { html, css, LitElement } from "lit";
import "./simple-card.js";
export class SimpleList extends LitElement {
    static styles = css`
        .wrap {
            margin: 10px;
            display: inline-block;
        }
    `;

    constructor() {
        super();
        this.num = 20;
    }

    render() {
        return html `
            ${Array.from({length: this.num}, () => {
                return html`<div class="wrap"><simple-card></simple-card></div>` 
            })}
        `
    }
}

customElements.define('simple-list', SimpleList);