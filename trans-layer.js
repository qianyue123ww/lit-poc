import { LitElement, css, html } from 'lit';
import {classMap} from 'lit/directives/class-map.js';
export const TransLayer = (superClass) => {
	class TransLayerEle extends superClass {
		static properties = {
			transLayerLoaded: {}
		}
		static styles = css`
			.mask-layer {
				position: fixed;
				display: block;
				opacity: .8;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				z-index: 1000;
				user-select: none;
				background-color: #eee;
			}
			.progress-bar {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				height: 3px;
				z-index: 1001;
			}
			.bar {
				// animation: animate .1s cubic-bezier(0.4,0.0,1,1) infinite;
				animation: animate 1s infinite;
				animation-timing-function: cubic-bezier(0.4,0.0,1,1);
				animation-delay: .1s;
				position: absolute;
				top: 0;
				left: 0;
				width: 25%;
				height: 100%;
				background: #68e;
				transform: scaleX(0);
				transform-origin: 0 0;
			}

			@keyframes animate {
				0% {
					transform: scaleX(0);
				}
				50% {
					transform: scaleX(5);
				}
				100% {
					transform: scaleX(5) translateX(100%);
				}
			}
		`
		constructor() {
			super();
			this.transLayerLoaded = false;
		}

		renderEle(content) {
			return html`
				${content}
				<div ?hidden=${this.transLayerLoaded}>
					<div class="progress-bar">
						<div class="bar"></div>
					</div>
					<div class="mask-layer"></div>
				</div>
			`;
		}

		setTransLayer(flag) {
			this.transLayerLoaded = flag;
		}
	}
	return TransLayerEle;
}

