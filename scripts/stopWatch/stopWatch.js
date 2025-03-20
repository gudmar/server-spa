const MS_IN_SECOND = 1000;

const SEDONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HUNDREDS_IN_MS = 10;
const TICK = 50;

const getArray = (size) => Array(size).fill(null).map(i => null)

class StopWatch {
    static placeholderSelectors = [
        '.digital-clock-display-hours',
        '.digital-clock-display-minutes',
        '.digital-clock-display-seconds',
        '.digital-clock-display-hundreds',
    ]

    // placeholders = [null, null, null, null]
        
    setPlaceholders = () => {
        StopWatch.placeholderSelectors.forEach(
            ((selector, index) => {
                console.log('Selector', selector, this, index)
                this.placeholders[index] = document.querySelector(selector)
            }).bind(this)
        )
    }

    set currentTime(value) {
        this._currentTime = value;
    }

    get currentTime() {
        return this._currentTime
    }

    constructor() {
        this.placeholders = getArray(4);
        this.setPlaceholders();
        this.currentTime = 0
    }

    static splitTime(timeIn_ms) {
        const msInH = (MS_IN_SECOND * SEDONDS_IN_MINUTE * MINUTES_IN_HOUR)
        const msInMin = (MS_IN_SECOND * SEDONDS_IN_MINUTE)
        const hours = Math.floor(timeIn_ms / msInH)
        const minutes = Math.floor((timeIn_ms - hours * msInH) / msInMin)
        const seconds = Math.floor((timeIn_ms - hours * msInH - minutes * msInMin) / MS_IN_SECOND)
        const hundreds = Math.ceil(timeIn_ms % MS_IN_SECOND / 10);
        return [hours, minutes, seconds, hundreds]
    }

    static verifyDimention(arr1, arr2) {
        if (!arr1?.length || !arr2?.length || arr1.length !== arr2.length) {
            throw new Error('arr1 or arr2 of wrong type')
        }
    }

    static getChangedMask(separatedTimeA, separatedTimeB) {
        StopWatch.verifyDimention(separatedTimeA, separatedTimeB)
        const mask = separatedTimeA.map((item, index) => separatedTimeB[index] - item === 0 ? 0 : 1)
        return mask;
    }

    static mask(arr, mask) {
        StopWatch.verifyDimention(arr, mask);
        const result = arr.map((item, index) => mask[index] * item)
        return result
    }

    updateDom(changesInTime) {
        StopWatch.verifyDimention(changesInTime, this.placeholders)
        changesInTime.forEach((change, index) => {
            if (change === 0) return
            this.placeholders[index].innerText = change
        })
    }

    setTime(time) {
        const delta = time - this.currentTime;
        const splittedCurrentTime = StopWatch.splitTime(delta);
        const splittedDelta = StopWatch.splitTime(delta);
        const changeMask = StopWatch.getChangedMask(splittedCurrentTime, splittedDelta);
        const changesInTime = StopWatch.mask(splittedDelta, changeMask);
        this.updateDom(changesInTime)
    }

    updateTime() {
        const updatedTime = Date.now();
        this.setTime(updatedTime)
    }

    tick() {
        console.log('tick')
        const update = (() => {this.updateDom}).bind(this)
        this._interval = setInterval(update, TICK)
    }

    run() { this.tick() }

    pause() { console.log('pause'); clearInterval(this._interval) }

    resume() { console.log('resume'); this.tick() }

    stop() {
        console.log('Stop')
        clearInterval(this._interval);
        this.setTime(0)
        this._currentTime = 0;
    }

    clear() {
        console.log('Clear')
        this.setTime(0)
        this._currentTime = 0;
    }    
}

const RUN_INDEX = 0;
const PAUSE_INDEX = 1;
const RESUME_INDEX = 2;
const STOP_INDEX = 3;
const CLEAR_INDEX = 4;

class StopWatchWithControls extends StopWatch {
    static controls = [
        '.stop-watch-run',
        '.stop-watch-pause',
        '.stop-watch-resume',
        '.stop-watch-stop',
        '.stop-watch-clear'
    ]

    buttons = Array(StopWatchWithControls.length).fill(null).map(v => null);

    constructor() {
        super();
        this.setButtons();
        this.setActions();
    }

    setButtons() {
        StopWatchWithControls.controls.forEach(((selector, index) => {
            console.log(this)
            this.buttons[index] = document.querySelector(selector)
        }).bind(this))
    }
    setActions() {
        const actions = [
            this.run.bind(this),
            this.pause.bind(this),
            this.resume.bind(this),
            this.stop.bind(this),
            this.clear.bind(this)
        ];
        console.log(this)
        this.buttons.forEach((button, index) => {
            button.addEventListener('click', actions[index])
            // button.addEventListener('click', () => console.log(index, this, actions[index]))
        })
    }
}

const stopWatch = new StopWatchWithControls();
