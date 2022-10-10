import './popup-card';

export default class PopupCardControl {
    constructor(opts) {
        this.defaultOpts = {
            title: 'hello wenwen',
            offsetY: 20,
            scale: 1.3
        };
        this.target = document.createElement('popup-card');
    }

    init(opts) {
        this.opts = {
            ...this.defaultOpts,
            ...opts,
        };
        this.hidden();
        this.target.addEventListener('mouseleave', this.leavePopup, false);
        document.body.appendChild(this.target);
        this.setLenAndWidth();
        this.setPos();
        this.target.data = this.opts.data;
        this.target.readyGo = this.readyGo.bind(this);
    }


    readyGo() {
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
            // const height = this.target.style.height + 'px';
            this.target.style.width = len + 'px';

            this.setLenAndWidth(len, 380);

            this.setPos(left, top);
        }, 100);
    }

    leavePopup = () => {
        requestAnimationFrame(() => {
            this.target.hiddenBtn();
            this.setLenAndWidth();
            this.setPos();

            setTimeout(() => {
                this.target.remove();
                this.opts.leaveCallBack();
            }, 200)
            // requestAnimationFrame(() => {
            //     this.target.remove();
            //     this.opts.leaveCallBack();
            // })
        })
    }

}