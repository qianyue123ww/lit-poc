import './popup-card';

export default class PopupCardControl {
    static getInstance() {
        if (!PopupCardControl.instance) {
            PopupCardControl.instance = new PopupCardControl();
        }
        return PopupCardControl.instance;
    }

    constructor(opts) {
        this.defaultOpts = {
            title: 'hello wenwen'
        };
        if (!this.target) {
            this.target = document.createElement('popup-card');
        }

    }

    init(opts) {
        this.opts = {
            ...this.defaultOpts,
            ...opts,
        };
        this.target.addEventListener('mouseleave', this.leavePopup, false);
        this.hidden();
        document.body.appendChild(this.target);
        this.readyGo();
        console.log(this.opts, 22)
    }


    readyGo() {
        this.setLenAndWidth();
        this.setPos();
        this.show();
        this.beginPopup();
    }

    setPos(x = this.opts.x, y = this.opts.y) {
        this.target.style.left = x + 'px';
        this.target.style.top = y + 'px';
    }

    setLenAndWidth(width = this.opts.width, height = this.opts.height) {
        this.target.style.width = width + 'px';
        this.target.style.height = height + 'px';
    }

    hidden() {
        this.target.style.display = 'none';
    }

    show() {
        this.target.style.display = 'block';
    }

    beginPopup() {
        setTimeout(() => {
            console.log(this.opts.title, this.target)
            this.target.title = this.opts.title;

            const {x, y, dis} = this.opts;
            const left = x - dis > 0 ? x - dis : x;
            const top = y - dis > 0 ? y - dis : y;
            console.log(left, top);
            this.setLenAndWidth(400, 200);
            this.setPos(left, top);
        }, 100);
    }

    leavePopup = () => {
        this.hidden();
        this.opts.leaveCallBack();
    }

}