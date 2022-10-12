import { html, css, LitElement } from "lit";
import "./simple-card.js";
import "./trans-layer.js";
import {until} from 'lit/directives/until.js';

import data from './mockData';
export class SimpleList extends LitElement {
    static properties = {
        loaded: {}
    }
    static styles = css`
        .list-wrap {
            width: 1000px;
            margin: auto;
        }
    `
    constructor() {
        super();
        this.loaded = false;
        console.log(this.loaded)
        setTimeout(() => {
            this.loaded = true;
            console.log('this loaded', this.loaded)
        }, 2000);
    }

    render() {
        return html `
            <div class="list-wrap">
                ${data.map(v => {
                    return html`<simple-card .data=${v}></simple-card>`
                })}
            </div>
            <div ?hidden=${this.loaded}><trans-layer></trans-layer></div>
        `
    }
}

customElements.define('simple-list', SimpleList);