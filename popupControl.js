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
            title: 'hello wenwen',
            offsetY: 20,
            scale: 1.3
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
    }


    readyGo() {
        this.setLenAndWidth();
        this.setPos();
        this.show();
        this.target.data = this.opts.data;
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
            this.target.data = this.opts.data;

            const {x, y, offsetX, offsetY, scale, width} = this.opts;
            let left = 0;
            let len = scale * width;

            // offsetX has higher priorities than scalc
            if (offsetX) {
                left = x - offsetX > 0 ? x - offsetX : x;
                len = width + 2 * offsetX;
            }
            else {
                const calcOffsetX = (scale - 1) * width / 2;
                left = x - calcOffsetX > 0 ? x -calcOffsetX : x;
            }
            const top = y - offsetY > 0 ? y - offsetY : y;
            const height = this.target.style.height + 'px';
            this.target.style.width = len + 'px';

            this.setLenAndWidth(len, 380);

            this.setPos(left, top);
        }, 100);
    }


    leavePopup = () => {
        this.hidden();
        this.opts.leaveCallBack();
    }

}