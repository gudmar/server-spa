
(() => {
    console.log('Starting clock')
    const getPlaceholders = () => {
        return {
            hoursPlaceholder: document.querySelector('.digital-clock-hours'),
            minutesPlaceholder: document.querySelector('.digital-clock-minutes'),
            secondsPlaceholder: document.querySelector('.digital-clock-seconds'),
        }
    }
    
    const getCurrentlyDisplayedTime = () => {
        const {
            hoursPlaceholder, minutesPlaceholder, secondsPlaceholder
        } = getPlaceholders();
        return {
            displayedHours: parseInt(hoursPlaceholder.innerText),
            displayedMinutes: parseInt(minutesPlaceholder.innerText),
            displayedSeconds: parseInt(secondsPlaceholder.innerText),
        }
    }
    
    const getCurrentTime = () => {
        const time = new Date(Date.now());
        return {
            hours: time.getHours(),
            minutes: time.getMinutes(),
            seconds: time.getSeconds(),
        }
    }
    
    const toZeroPrefixedString = (val) => `${val}`.padStart(2, '0')
    
    const updateTime = () => {
        const {
            hoursPlaceholder, minutesPlaceholder, secondsPlaceholder
        } = getPlaceholders();
        const {
            displayedHours, displayedMinutes, displayedSeconds
        } = getCurrentlyDisplayedTime();
        const {
            hours, minutes, seconds
        } = getCurrentTime();
        if (hours !== displayedHours) hoursPlaceholder.innerText =       toZeroPrefixedString(hours);
        if (minutes !== displayedMinutes) minutesPlaceholder.innerText = toZeroPrefixedString(minutes);
        if (seconds !== displayedSeconds) secondsPlaceholder.innerText = toZeroPrefixedString(seconds);
    }
    
    const startClock = () => {
        const interval = setInterval(updateTime, 1000)
        const reaper = new GrimReaper();
        reaper.addToBookOfDeath(() => clearInterval(interval))
    }
    startClock();    
})()
