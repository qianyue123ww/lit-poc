import { html, css, LitElement } from 'lit';
import './simple-card';
class PopupCard extends LitElement {
    static styles = css`
        :host {
            position: absolute;
            transition: all 200ms linear;
            width: 100%;
            height: 100%;
            /* border: 1px solid rgb(228, 228, 231); */
			box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px;
			background-color: #fff;
			border-radius: 8px;
            overflow: hidden;
            // 一定要固定高度
        }
        .card {
            display: flex;
			align-items: center;
			padding: 10px;
            margin: auto;
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
        .desc {
			overflow: hidden;
			text-overflow: ellipsis;
			word-break:break-all;
			word-wrap: break-word;
			-webkit-box-orient: vertical;
			display: -webkit-box;
			-webkit-line-clamp: 2;
		}

        /* .card2 {

        } */
        .img2 {
			/* max-width: 100%; */
            width: 100%;
            max-height: 200px;
            object-fit: cover;
            /* height: 300px; */
			/* width: 100%;
            height: 210px; */
			/* height: 156px; */
            /* max-width: 400px;
            width: 100%;
			height: 200px; */
			background-color: #ccc;
		}
    `

    static properties = {
        data: {
            type: Object
        },
        title: {
            type: String
        }
    }
    constructor(opts) {
        super();
        this.title = 'hello world';
        const videoplayer = document.getElementById('videoplayer');
        const test = document.getElementById('id');

        console.log(test, videoplayer);
    }

    async test(e) {
        // target.pla();


        console.log(123, e.target);
        const target = e.target;
        target.currentTime = 1;
        target.controls = false;

        target.pause();
        // await
        setTimeout(() => {
            const videoplayer = document.getElementById('videoplayer');
            console.log(e.target, videoplayer);
            // videoplayer.play();
            target.muted = true;
            target.controls = true;
            // target.currentTime = 5;
            target.play();
        }, 3000)
    }

    render() {
        return html`
            <!-- <div class="card">
                <img src=${this.data.icon} class="img"/>
                <div class="right-wrap">
                    <div class="title">${this.data.title}</div>
                    <div class="desc">${this.data.description}</div>
                </div>
            </div>
            <div class="test">${this.title}</div> -->
            <div class="card2">
                <!-- <img src=${this.data.icon} class="img2"/> -->
                <video
                    id="videoplayer"
                    @mouseover="${this.test}"
                    poster=${this.data.icon}
                    class="img2"
                    src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
                >
                    当前浏览器不支持video标签
                </video>
                <div class="title" id="test">${this.data.title}</div>
                <div class="desc">${this.data.description}</div>
            </div>
        `
    }
}

customElements.define('popup-card', PopupCard);
