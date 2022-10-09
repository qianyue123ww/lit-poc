import { html, css, LitElement } from "lit";
import "./simple-card.js";
import data from './mockData';
export class SimpleList extends LitElement {

    constructor() {
        super();
        this.num = 20;
    }

    render() {
        return html `
            ${data.map(v => {
                return html`<simple-card .data=${v}></simple-card>`
            })}
        `
        // return html`
        //     <simple-card .data=${data[0]}></simple-card>
        // `
    }
}

customElements.define('simple-list', SimpleList);