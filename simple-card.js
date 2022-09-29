import { html, css, LitElement } from 'lit';

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
			border: 1px solid rgb(228, 228, 231);
			box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px;
			display: flex;
			padding: 10px;
			width: 300px;
			border-radius: 8px;
			cursor: pointer;
			transition: translateY 200ms linear;
		}
		.card-wrap:hover {
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
		.test {
			animation: animate 1s infinite linear;
		}
		.clear {
			clear: both;
		}
		@keyframes animate {

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

  	`;

	static properties = {
	};

	constructor() {
		super();
		this.status = Status.unprepared;
	}

	debounce(fn, waitTime) {
		let timer;
		return function(e) {
			this.status = Status.ready;
			const context = this;
			const args = [e.target, ...arguments];
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
		target.classList.add('test');
	}

	handleLeave(e) {
		this.status = Status.unprepared;
		const ele = e.target;
		ele.classList.remove('test');
	}

	render() {
		return html`
			<div 
				class="card-wrap"
				@mouseenter="${this.debounce(this.handleEnter, waitTime)}"
				@mouseleave="${this.handleLeave}"
			>
				<div class="img"></div>
				<div class="right-wrap">
					<div class="title">this is title</div>
					<div class="description">this is decription</div>
				</div>
				<div class="clear"></div>
			</div>
		`
	}

}

customElements.define('simple-card', SimpleCard);
