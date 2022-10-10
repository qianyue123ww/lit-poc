import { html, css, LitElement } from 'lit';
import {styleMap} from 'lit/directives/style-map.js';

class PopupCard extends LitElement {
    static styles = css`
        :host {
            position: absolute;
            transition: all 200ms linear;
            width: 100%;
            height: 100%;
			box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px -2px;
			background-color: #fff;
			border-radius: 8px;
            cursor: pointer;
        }
        .card {
            border-radius: 8px;
            overflow: hidden;
        }
        .img {
            width: 100%;
            object-fit: cover;
			background-color: #ccc;
		}
        .desc-wrap {
			padding: 10px;
		}
		.title {
			overflow: hidden;
			text-overflow: ellipsis;
			word-break:break-all;
			word-wrap: break-word;
			-webkit-box-orient: vertical;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			font-size: 18px;
			font-weight: bold;
		}
		.desc {
			overflow: hidden;
			text-overflow: ellipsis;
			word-break:break-all;
			word-wrap: break-word;
			-webkit-box-orient: vertical;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			font-size: 14px;
			color: #3a3a3a;
			min-height: 50px;
			margin: 5px 0;
		}
		.time {
			color: #7c7a7a;
			font-size: 12px;
		}
        .btn {
            border-radius: 8px;
            border: none;
            padding: 5px 40px;
            color: #777778;
            margin-top: 10px;
            transition: all 100ms linear;
        }
    `

    static properties = {
        data: {
            type: Object
        },
        showBtn: {
            type: String
        },
        videoCanPlay: {
            type: Boolean
        }
    }
    constructor(opts) {
        super();
        const videoplayer = document.getElementById('videoplayer');
        this.videoCanPlay = false;
        this.showBtn = false;

        setTimeout(() => {
            this.showBtn = true;
        }, 200);

    }

    videoLoaded(e) {
        console.log('video loaded')
        const target = e.target;
        setTimeout(() => {
            this.videoCanPlay = true;
            target.muted = true;
            target.controls = true;
            target.play();
        }, 2000);
    }

    imgloaded(e) {
        console.log('img is loaded');
        this.readyGo();
    }

    hiddenBtn() {
        this.showBtn = false;
    }


    render() {
        const imgStyles = {'display': this.videoCanPlay ? 'none' : 'block'};
        const videoStyles= {'display': this.videoCanPlay ? 'block' : 'none'};
        const btnStyles = {'opacity': this.showBtn ? 1 : 0};

        const videoSrc = `./video/${this.data.video}`
        // const videoStyles= {'opacity': this.videoCanPlay ? 1 : 0};

        return html`


            <div class="card">
                <div>
                    <video
                        @canplay="${this.videoLoaded}"
                        id="videoplayer"
                        class="img"
                        style=${styleMap(videoStyles)}
                        src=${videoSrc}
                    >
                        当前浏览器不支持video标签
                    </video>
                    <img
                        src=${this.data.icon}
                        class="img"
                        @load="${this.imgloaded}"
                        style=${styleMap(imgStyles)}
                    />
                </div>
                <div class="desc-wrap">
						<div class="title">${this.data.title}</div>
						<div class="desc">${this.data.description}</div>
						<div class="time">播出时间：${this.data.time}</div>
                    <button class="btn" style=${styleMap(btnStyles)}>查看详情</button>
				</div>
            </div>
        `
    }
}

customElements.define('popup-card', PopupCard);
