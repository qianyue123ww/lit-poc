import { html, css, LitElement } from "lit";
import "./simple-card.js";

import data from './mockData';
export class SimpleList extends LitElement {
    static styles = css`
        .list-wrap {
            width: 1000px;
            margin: auto;
        }
    `
    constructor() {
        super();
        this.num = 20;
    }

    render() {
        return html `
            <div class="list-wrap">
                ${data.map(v => {
                    return html`<simple-card .data=${v}></simple-card>`
                })}

            </div>
        `
    }
}

customElements.define('simple-list', SimpleList);