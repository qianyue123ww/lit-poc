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
        }
        /* .img2-wrap {
            height: 250px;
            position: relative;
			transition: all 200ms linear;

        } */
        .img2 {
            width: 100%;
            /* height: 100%; */
            /* max-height: 200px; */
            // max-height: 200px;


            object-fit: cover;
			background-color: #ccc;
		}

    `

    static properties = {
        data: {
            type: Object
        },
        title: {
            type: String
        },
        videoCanPlay: {
            type: Boolean
        }
    }
    constructor(opts) {
        super();
        this.title = 'hello world';
        const videoplayer = document.getElementById('videoplayer');
        this.videoCanPlay = false;

        // setTimeout(() => {
        //     this.imgloaded();
        // }, 3000)

    }

    videoLoaded(e) {
        const target = e.target;
        setTimeout(() => {
            this.videoCanPlay = true;
            target.muted = true;
            target.controls = true;
            target.play();
        }, 2000 );
    }

    imgloaded(e) {
        console.log('img is loaded');
        this.videoCanPlay = false;
        this.readyGo();
    }


    render() {
        const imgStyles = {'display': this.videoCanPlay ? 'none' : 'block'};
        const videoStyles= {'display': this.videoCanPlay ? 'block' : 'none'};
        // const imgStyles = {'opacity': this.videoCanPlay ? 0 : 1};
        // const videoStyles= {'opacity': this.videoCanPlay ? 1 : 0};

        return html`
            <!-- <div class="card">
                <img src=${this.data.icon} class="img"/>
                <div class="right-wrap">
                    <div class="title">${this.data.title}</div>
                    <div class="desc">${this.data.description}</div>
                </div>
            </div>
            <div class="test">${this.title}</div> -->
            <!--mp4在线测试视频： https://www.jianshu.com/p/34ce7f9b469a -->
            <!-- const test = http://vfx.mtime.cn/Video/2019/03/09/mp4/190309153658147087.mp4 -->
            <!-- src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" -->

            <div class="card2">
                <div class="img2-wrap">
                    <video
                        @canplay="${this.videoLoaded}"
                        id="videoplayer"
                        class="img2"
                        src=${this.data.video}
                        style=${styleMap(videoStyles)}
                    >
                        当前浏览器不支持video标签
                    </video>
                    <img
                        src=${this.data.icon}
                        class="img2"
                        @load="${this.imgloaded}"
                        style=${styleMap(imgStyles)}
                    />
                </div>
                <!-- <div class="title" id="test">${this.data.title}</div> -->
                <div class="desc-wrap">
						<div class="title">${this.data.title}</div>
						<div class="desc">${this.data.description}</div>
						<div class="time">播出时间：${this.data.time}</div>
                    <button class="btn">查看详情</button>
				</div>
            </div>
        `
    }
}

customElements.define('popup-card', PopupCard);
