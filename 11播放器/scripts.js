const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const toggle = player.querySelector('.toggle')
const skipBtns = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const progressBar = player.querySelector('.progress__filled')
const progress = player.querySelector('.progress')
function togglePlay(){
    const method = video.paused ? 'play' : 'pause'
    video[method]()
}
function updateToggle(){
    const icon = video.paused ? '►' : '❚❚'
    toggle.textContent = icon
}
function skip(){
    video.currentTime +=parseFloat(this.dataset.skip)
}
function handleRange(){
    video[this.name] = this.value
}
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}
function handleProgressbar(e){
    const barTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = barTime
}
let mousedown = false
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateToggle)
video.addEventListener('pause', updateToggle)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipBtns.forEach(btn => btn.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRange))
ranges.forEach(range => range.addEventListener('mousemove', handleRange))
progress.addEventListener('click', handleProgressbar)
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
progress.addEventListener('mousemove', mousedown && handleProgress(e))