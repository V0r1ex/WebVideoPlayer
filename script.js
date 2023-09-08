const playHtml = '<i class="fa-solid fa-play" aria-hidden="true"></i>'
const pauseHtml = '<i class="fa-solid fa-pause" aria-hidden="true"></i>'

let video = document.querySelector('video')  
let btnPlay = document.querySelector(".playBtn") 
let btnVolume = document.querySelector('.volumeSet')
let btnFullScreen = document.querySelector(".fullScreenBtn") 
let volumeSlider = document.querySelector('.volumeRange')
let progressContainer = document.querySelector('.progressContainer')
let timeProgress = document.querySelector('progress')
let timeNow = document.querySelector('.timeNow')
let timeFull = document.querySelector('.timeFull')  
let controls = document.querySelector('.controls')
let videoPlayer = document.querySelector('.videoPlayer') 
let iconButton = document.querySelector('.iconButton')
let iconContainer = iconButton.querySelector('.iconContainer')
let slider = document.querySelector('.slider')
let volumeContainer = document.querySelector('.volumeContainer')
let timeoutControls

iconContainer.addEventListener('click', pausePlay)
btnPlay.addEventListener('click', pausePlay)
volumeSlider.addEventListener('input', setVolume)
video.addEventListener('timeupdate', timeUpdate)
timeProgress.addEventListener('click', videoRewind)
videoPlayer.addEventListener('mouseout', hideControls)
videoPlayer.addEventListener('mouseover', () => {
    iconContainer.style.animation = 'play .5s forwards'
    controls.style.opacity = '1'
})
video.addEventListener('ended', () => {
    iconContainer.innerHTML = playHtml
    btnPlay.innerHTML = playHtml
})
btnVolume.addEventListener('mouseover', () => {
   if (!volumeSlider.classList.contains('active')) volumeSlider.classList.toggle('active')
})
video.addEventListener('loadeddata', () => {
    timeFull.textContent = formatTime(video.duration)
})
btnVolume.addEventListener('click', switchVolume)
volumeContainer.addEventListener('mouseleave', () => {
    volumeSlider.classList.remove('active')
})
btnFullScreen.addEventListener('click', () => {
    video.webkitEnterFullscreen()
})

function hideControls() {
    if (!video.paused) {
        clearTimeout(timeoutControls)
        timeoutControls = setTimeout(() => {
            iconContainer.style.animation = 'pause .5s forwards'
            controls.style.opacity = '0'
        }, 3000)
    }
}

function pausePlay() {
    if (video.paused) {
        video.play()
        iconContainer.innerHTML = pauseHtml
        btnPlay.innerHTML = pauseHtml
    } else {
        video.pause()
        iconContainer.innerHTML = playHtml
        btnPlay.innerHTML = playHtml
    }
}

function setVolume() {
    video.volume = volumeSlider.value / 100
}

function switchVolume() {
    if (volumeSlider.value != 0) {
        btnVolume.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true"></i>'
        volumeSlider.value = 0
        video.volume = 0
    } else {
        btnVolume.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>'
        volumeSlider.value = 100
        video.volume = 1
    }
}

function timeUpdate() {
    timeProgress.value = video.currentTime / video.duration * 100
    slider.style.left = timeProgress.offsetWidth / video.duration * video.currentTime - slider.offsetWidth/2 + 'px'
    timeNow.textContent = formatTime(video.currentTime)
}

function editTime(time) {
    return String(time).length > 1 ? time : `0${time}`
}

function formatTime(time) {
    time = new Date(Math.floor(time) * 1000)
    if (time.getTime() <= 360000) {
        time = `${editTime(time.getMinutes())}:${editTime(time.getSeconds())}`
    } else {
        time = `${editTime(time.getHours())}:${editTime(time.getMinutes())}:${editTime(time.getSeconds())}`
    }

    return time
}

function videoRewind(event) {
    const clickPos = event.offsetX
    video.currentTime = video.duration * clickPos / timeProgress.offsetWidth
}
