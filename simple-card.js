import { html, css, LitElement } from 'lit';
// import './popup-card';
import PopupCardControl from './popupControl';
const Status = {
	unprepared: 0,
	ready: 1,
	init: 2,
	success: 3,
	failed: 4,
	ending: 5,
}

const waitTime = 1000;


export class SimpleCard extends LitElement {
	static styles = css`
		:host {
			display: inline-block;
			margin: 10px;
		}
		:host([test1]) {
			border: 1px solid red;
		}
		.card-wrap {
			cursor: pointer;
			position: relative;
		}
		.popup-card {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0
		}
		.card {
			background-color: #fff;
			border: 1px solid rgb(228, 228, 231);
			box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px;
			display: flex;
			align-items: center;
			padding: 10px;
			width: 360px;
			height: 120px;
			border-radius: 8px;
			transition: translateY 200ms linear;
		}
		.move {
			box-shadow: rgb(9 30 66 / 25%) 0px 8px 12px -2px;
			transform: translateY(-2px);
		}

		.img {
			width: 100px;
			height: 100px;
			background-color: #ccc;
			border-radius: 100%;
			margin-right: 20px;
			clear: both;
			border: 1px solid #eee;

		}
		.right-wrap {
			margin-top: 5px;
		}
		.breath {
			animation: breathe 1s infinite linear;
		}
		.paused {
			animation-play-state: paused;
		}
		.clear {
			clear: both;
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


		.card2 {
			background-color: #fff;
			border: 1px solid rgb(228, 228, 231);
			box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px;
			/* display: flex;
			align-items: center; */
			width: 280px;
			height: 300px;
			border-radius: 8px;
			transition: translateY 200ms linear;
			overflow: hidden;
		}
		.img2 {
			/* max-width: 100%; */
			width: 100%;
			height: 156px;
			object-fit: contain;
			/* height: 156px; */
			/* height: 156px; */
			/* max-width: 400px;
			max-height: 500px; */
			background-color: #ccc;
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
  	`;

	static properties = {
		data: {
			type: Object
		}
	};

	constructor() {
		super();
		this.status = Status.unprepared;
	}

	createElement(targe) {
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
	async loadingPopupMain(target) {
		target.classList.add('paused');
		const {width, height, x, y} = this.getPos(target);
		// const {width, height, x, y}  = await this.getPos(target);

		this.popup = PopupCardControl.getInstance();
		this.popup.init({
			data: this.data,
			width,
			height,
			x,
			y,
			// offsetX: 100,
			offsetY: 0,
			leaveCallBack: () => {
				target.classList.remove('paused');
			}
		});
	}

	debounce(fn, waitTime) {
		let timer;
		return function(e) {
			const targe = e.target.children[0];
			targe.classList.add('move');
			this.status = Status.ready;
			const context = this;
			const args = [targe, ...arguments];
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				fn.apply(context, args);
			}, waitTime);
		}
	}

	handleEnter(target, e) {
		if (this.status === Status.unprepared) return;
		target.classList.add('breath');

		// loading data
		setTimeout(() => {
			if (this.status === Status.unprepared) return;
			this.loadingPopupMain(target);
		}, 2000);

	}

	handleLeave(e) {
		this.status = Status.unprepared;
		const ele = e.target.children[0];
		ele.classList.remove('breath', 'move');
	}


	render() {
		return html`
			<div
				class="card-wrap"
				@mouseenter="${this.debounce(this.handleEnter, waitTime)}"
				@mouseleave="${this.handleLeave}"
			>
				<!-- <div class="card">
					<img src=${this.data.icon} class="img"/>
					<div class="right-wrap">
						<div class="title">${this.data.title}</div>
						<div class="desc">${this.data.description}</div>
					</div>
				</div> -->

				<div class="card2">
					<img src=${this.data.icon} class="img2" />
					<div style="padding: 10px;">
						<div class="desc">${this.data.description}</div>
					</div>
				</div>
			</div>
		`
	}

}

customElements.define('simple-card', SimpleCard);
