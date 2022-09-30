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
			padding: 10px;
			width: 300px;
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
		.test {
			transition: all 500ms ease-in-out;
		}
  	`;

	static properties = {
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
			width,
			height,
			x,
			y,
			dis: 20,
			leaveCallBack: () => {
				target.classList.remove('paused');
			}
		});

		// console.log(x, y);
		// this.createElement(target);
		// const body = document.getElementsByTagName('body')[0];
		// const test = document.createElement('popup-card');
		// test.style.width = width + 'px';
		// test.style.height = height + 'px';
		// test.style.left = x + 'px';
		// test.style.top = y + 'px';
		// body.appendChild(test);
		// console.log(target)

		// setTimeout(() => {
		// 	const dis = 20;
		// 	test.title = 'hello wenwen';
		// 	test.classList.add('test');
		// 	test.style.left = x - dis + 'px';
		// 	test.style.top = y - dis + 'px';
		// 	// test.style.right
		// 	test.style.width = '400px';
		// 	test.style.height = '200px';
		// 	console.log(x, y);
		// }, 200)

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
		console.log('enter', this.status)
		if (this.status === Status.unprepared) return;
		target.classList.add('breath');

		// loading data
		setTimeout(() => {
			if (this.status === Status.unprepared) return;
			this.loadingPopupMain(target);
		}, 1000);

	}

	handleLeave(e) {
		console.log(1, e)
		this.status = Status.unprepared;
		const ele = e.target.children[0];
		ele.classList.remove('breath', 'move');
		console.log(e.target);
	}

	render() {
		return html`
			<div
				class="card-wrap"
				@mouseenter="${this.debounce(this.handleEnter, waitTime)}"
				@mouseleave="${this.handleLeave}"
			>
				<div class="card">
					<div class="img"></div>
					<div class="right-wrap">
						<div class="title">this is title${this.status}</div>
						<div class="description">this is decription</div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		`
	}

}

customElements.define('simple-card', SimpleCard);
