const video = document.querySelector('video');
const playBtn = document.querySelector('#play');
const muteBtn = document.querySelector('#mute');
const volumeRange = document.querySelector('#volume');
const currentTime = document.querySelector('#currentTime');
const totalTime = document.querySelector('#totalTime');
const timeline = document.querySelector('#timeline');
const fullScreenBtn = document.querySelector('#fullScreen');
const videoContainer = document.querySelector('#videoContainer');
const videoControls = document.querySelector('#videoControls');

let controlsTimeout = null;
let controlsMovementTimeout = null;

let volumeValue = 0.5;
video.volume = volumeValue;

let videoPlayStatus = false;
let setVideoPlayStatus = false;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? 'Play' : 'Pause';
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? 'Unmute' : 'Mute';
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = 'Mute';
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
  if (video.currentTime === video.duration) {
    playBtn.innerText = 'play';
  }
};

const handleTimelineChange = (e) => {
  const {
    target: { value },
  } = e;
  if (!setVideoPlayStatus) {
    videoPlayStatus = video.paused ? false : true;
    setVideoPlayStatus = true;
  }
  video.pause();
  video.currentTime = value;
};

const handleTimelineSet = () => {
  videoPlayStatus ? video.play() : video.pause();
  setVideoPlayStatus = false;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = 'Enter Full Screen';
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = 'Exit Full Screen';
  }
};

const hideControls = () => {
  videoContainer.classList.remove('showing');
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add('showing');
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumeChange);
video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
timeline.addEventListener('input', handleTimelineChange);
timeline.addEventListener('change', handleTimelineSet);
window.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    handlePlayClick();
  }
});
fullScreenBtn.addEventListener('click', handleFullscreen);
video.addEventListener('mousemove', handleMouseMove);
video.addEventListener('mouseleave', handleMouseLeave);
