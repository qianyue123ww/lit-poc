import { html, css, LitElement } from 'lit';

const Statue = {
	uninitialized: 0,
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
			// background-color: red;
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
			transition: all 200ms linear;
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
		}
		.right-wrap {
			margin: 5px 0 0 15px;
		}
		.test {
			animation: animate 1s infinite ease-in-out;
		}
		@keyframes animate {
			0% {
				transform: scale(1, 1) translateY(-2px);
			}

			50% {
				transform: scale(1.05, 1.05) translateY(-2px);
			}
		}
  	`;

	static properties = {
	};

	constructor() {
		super();
		this.statue = Statue.uninitialized;
	}

	debounce(fn, waitTime) {
		let timer;
		return function() {
			const context = this;
			const args = arguments;
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				fn.apply(context, args);
			})
		}
	}

	handleEnter(e) {
		const ele = e.target;
		this.enterTime = new Date().getTime();
		
		setTimeout(() => {
			// if ()
			ele.classList.add('test');
		}, waitTime);
		// if (new Date().getTime() - 
		// ) {
		// 	console.log(123)
		// 	ele.classList.add('test');
		// }
		// setTimeout(() => {
		// 	ele.classList.add('test');
		// }, waitTime);
		
	}

	handleLeave(e) {
		const ele = e.target;
		this.enterTime = null;
		ele.classList.remove('test');
	}

	render() {
		return html`
			<div 
				class="card-wrap"
				@mouseenter="${this.handleEnter}"
				@mouseleave="${this.handleLeave}"
			>
				<div class="img"></div>
				<div class="right-wrap">
					<div class="title">this is title</div>
					<div class="description">this is decription</div>
				</div>
			</div>
		`
	}

}

customElements.define('simple-card', SimpleCard);
