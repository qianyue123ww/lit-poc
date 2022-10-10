import { html, css, LitElement } from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import PopupCardControl from './popupControl';
const Status = {
	noReady: 0,
	ready: 1,
}

const waitTime = 1000;

export class SimpleCard extends LitElement {
	static styles = css`
		:host {
			display: inline-block;
			margin: 10px;
		}
		.card-wrap {
			cursor: pointer;
			position: relative;
		}

		.card {
			background-color: #fff;
			border: 1px solid rgb(228, 228, 231);
			box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px;
			width: 280px;
			height: 300px;
			border-radius: 8px;
			transition: translateY 200ms linear;
            box-sizing: border-box;
			overflow: hidden;
		}
		.img-wrap {
			position: relative;
			height: 156px;
		}
		.img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			background-color: #ccc;
		}
		.desc-wrap {
			padding: 10px;
		}
		.desc {
			overflow: hidden;
			text-overflow: ellipsis;
			word-break:break-all;
			word-wrap: break-word;
			-webkit-box-orient: vertical;
			display: -webkit-box;
			-webkit-line-clamp: 2;
		}
		.move {
			box-shadow: rgb(9 30 66 / 25%) 0px 8px 12px -2px;
			transform: translateY(-2px);
		}

		.breath {
			animation: breathe 1s infinite linear;
		}
		.paused {
			animation-play-state: paused;
		}

		@keyframes breathe {

			25% {
				transform:  scale(0.98, 0.98) translateY(-2px);
			}

			50% {
				transform: scale(1, 1) translateY(-2px);
			}

			75% {
				transform:  scale(1.02, 1.02) translateY(-2px);
			}

			100% {
				transform: scale(1, 1) translateY(-2px);
			}
		}


        .hover-tip::before {
            content: 'Keep hovering to play';
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
            color: #fff;
            background-color: #333;
			font-size: 12px;
			padding: 2px 5px;
			z-index: 1;
        }

  	`;

	static properties = {
		data: {
			type: Object
		},
		showHoverTip: {
			type: Boolean
		},
	};

	constructor() {
		super();
		this.status = Status.noReady;
		this.showHoverTip = false;
	}



	getPos(target) {
		const {width, height, left, top} = target.getBoundingClientRect();
		const scrollTop = window.scrollY;
		return {
			width,
			height,
			x: left,
			y: scrollTop + top
		}
	}

	// loading popupcard main
	async loadingPopupCard(target) {
		this.popup = new PopupCardControl();
		target.classList.add('paused');
		const {width, height, x, y} = this.getPos(target);

		this.popup.init({
			data: this.data,
			width,
			height,
			x,
			y,
			// offsetX: 100,
			offsetY: 20,
			leaveCallBack: () => {
				target.classList.remove('paused');
			}
		});
	}

	debounce(handle, waitTime) {
		let timer;
		return function(e) {
			const target = e.target.children[0];
			this.readyToEnter(target);
			const context = this;
			const args = [target, ...arguments];
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				handle.apply(context, args);
			}, waitTime);
		}
	}

	readyToEnter(target) {
		this.showHoverTip = true;
		clearTimeout(this.beginAnimateTimer);
		target.classList.add('move');
		this.status = Status.ready;
	}

	handleEnter(target, e) {
		if (this.status === Status.noReady) return;
		target.classList.add('breath');


		// loading data
		this.beginAnimateTimer = setTimeout(() => {
			if (this.status === Status.noReady) return;
			this.loadingPopupCard(target);
		}, 1500);

	}

	handleLeave(e) {
		this.status = Status.noReady;
		const ele = e.target.children[0];
		ele.classList.remove('breath', 'move');
		this.showHoverTip = false;
	}


	render() {
		const imgWrapClasses = {'img-wrap': true, 'hover-tip': this.showHoverTip};

		return html`
			<div
				class="card-wrap"
				@mouseenter="${this.debounce(this.handleEnter, waitTime)}"
				@mouseleave="${this.handleLeave}"
			>
				<div class="card">
					<div class=${classMap(imgWrapClasses)}>
						<img src=${this.data.icon} class="img" />
					</div>
					<div class="desc-wrap">
						<div class="desc">${this.data.description}</div>
					</div>
				</div>
			</div>
		`
	}

}

customElements.define('simple-card', SimpleCard);
