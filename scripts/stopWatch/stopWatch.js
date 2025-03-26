(() => {
    const MS_IN_SECOND = 1000;
    const SEDONDS_IN_MINUTE = 60;
    const MINUTES_IN_HOUR = 60;
    const HUNDREDS_IN_MS = 10;
    const TICK = 15;
    
    const getArray = (size) => Array(size).fill(null).map(i => null)
    
    class StopWatch {
        static placeholderSelectors = [
            '.digital-clock-display-hours',
            '.digital-clock-display-minutes',
            '.digital-clock-display-seconds',
            '.digital-clock-display-hundreds',
        ]
            
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
            this.isPaused = false;
            this.isNoRun = true;
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
                throw new Error(`arr1 or arr2 of wrong type: arg1.length = [${arr1?.length}], arr2.length = [${arr2?.length}], arr1 = [${arr1}], arr2 = [${arr2}]`)
            }
        }
    
        updateDom(changesInTime) {
            StopWatch.verifyDimention(changesInTime, this.placeholders)
            changesInTime.forEach(((change, index) => {
                const pad = index === this.placeholders.length - 1 ? 3 : 2
                const newValue = `${change}`.padStart(pad, "0")
                const currentValue = this.placeholders[index];
                if (newValue === currentValue) return;
                this.placeholders[index].innerText = newValue
            }).bind(this))
        }
    
        setTime(time) {
            const delta = time - this.currentTime;
            const splittedDelta = StopWatch.splitTime(delta);
            this.updateDom(splittedDelta)
        }
    
        updateTime() {
            const updatedTime = Date.now();
            this.setTime(updatedTime)
        }
    
        tick() {
            const update = (() => {this.updateTime()}).bind(this)
            this._interval = setInterval(update, TICK)
        }
    
        run() { 
            this.isPaused = false;
            this.isNoRun = false;
            this._currentTime = Date.now();
            this.tick() 
        }
    
        pause() { this.isPaused = true; clearInterval(this._interval) }
    
        resume() { 
            if (!this.isPaused) return;
            this.isPaused = false;
            this.tick() 
        }
    
        stop() {
            this.isPaused = false;
            this.isNoRun = true;
            clearInterval(this._interval);
            this._currentTime = Date.now();
            this.setTime(Date.now())
            this._currentTime = Date.now();
        }
    
        clear() {
            this.isPaused = false;
            this._currentTime = Date.now();
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
    
        static get pauseButton() {
            return document.querySelector(StopWatchWithControls.controls[1])
        }
    
        static get resumeButton() {
            return document.querySelector(StopWatchWithControls.controls[2])
        }
    
        static enablePause() {
            StopWatchWithControls.pauseButton.classList.remove('disabled')
        }
        static disablePause() {
            StopWatchWithControls.pauseButton.classList.add('disabled')
        }
    
        static enableResume() {
            StopWatchWithControls.resumeButton.classList.remove('disabled')
        }
        static disableResume() {
            StopWatchWithControls.resumeButton.classList.add('disabled')
        }
        disableResumeAndPause() {
            StopWatchWithControls.disablePause()
            StopWatchWithControls.disableResume()
        }
    
        disablePauseEnableResume() {
            StopWatchWithControls.disablePause()
            StopWatchWithControls.enableResume()
        }
    
        enablePauseDisableResume() {
            StopWatchWithControls.enablePause()
            StopWatchWithControls.disableResume();
        }
    
        handleButtonsOnPause() {
            if (this.isNoRun) this.disableResumeAndPause();
            else if (this.isPaused) this.disablePauseEnableResume()
            else this.enablePauseDisableResume();
        }
    
        constructor() {
            super();
            this.setButtons();
            this.setActions();
            this.handleButtonsOnPause()
        }
    
        setButtons() {
            StopWatchWithControls.controls.forEach(((selector, index) => {
                console.log(this)
                this.buttons[index] = document.querySelector(selector)
            }).bind(this))
        }
    
        wrapWithHandlePaused(fn) {
            fn.call(this)
            this.handleButtonsOnPause()
        }
    
        setActions() {
            const actions = [
                this.wrapWithHandlePaused.bind(this, this.run),
                this.wrapWithHandlePaused.bind(this, this.pause),
                this.wrapWithHandlePaused.bind(this, this.resume),
                // this.pause.bind(this),
                // this.resume.bind(this),
                this.wrapWithHandlePaused.bind(this, this.stop),
                this.wrapWithHandlePaused.bind(this, this.clear)
            ];
            console.log(this)
            this.buttons.forEach((button, index) => {
                button.addEventListener('click', actions[index])
                // button.addEventListener('click', () => console.log(index, this, actions[index]))
            })
        }
    }
    
    const stopWatch = new StopWatchWithControls();
    
})()

