import { html, css, LitElement } from "lit";
import "./simple-card.js";
import { TransLayer } from "./trans-layer.js";
import {until} from 'lit/directives/until.js';

import data from './mockData';

const TransLayerPage = TransLayer(LitElement);
export class SimpleList extends TransLayerPage {
    static properties = {
        loaded: {}
    }
    static styles = [
        TransLayerPage.styles || [],
        css`
            .list-wrap {
                width: 1000px;
                margin: auto;
            }
        `
    ]
    constructor() {
        super();
        this.setTransLayer(false);
        setTimeout(() => {
            this.setTransLayer(true);
        }, 2000);
    }

    render() {
        return this.renderEle(
            html`
                <div class="list-wrap">
                    ${data.map(v => {
                        return html`<simple-card .data=${v}></simple-card>`
                    })}
                </div>
            `
        );
        // return html `
        //     <div class="list-wrap">
        //         ${data.map(v => {
        //             return html`<simple-card .data=${v}></simple-card>`
        //         })}
        //     </div>
        //     <div ?hidden=${this.loaded}><trans-layer></trans-layer></div>
        // `

    }
}

customElements.define('simple-list', SimpleList);
