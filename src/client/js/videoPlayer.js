const video = document.querySelector('video');
const playBtn = document.querySelector('#play');
const playBtnIcon = playBtn.querySelector('i');
const muteBtn = document.querySelector('#mute');
const muteBtnIcon = muteBtn.querySelector('i');
const volumeRange = document.querySelector('#volume');
const currentTime = document.querySelector('#currentTime');
const totalTime = document.querySelector('#totalTime');
const timeline = document.querySelector('#timeline');
const fullScreenBtn = document.querySelector('#fullScreen');
const fullScreenBtnIcon = fullScreenBtn.querySelector('i');
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
  playBtnIcon.classList = video.paused ? 'fas fa-play' : 'fa fa-pause';
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? 'fas fa-volume-mute'
    : 'fas fa-volume-up';
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = 'fas fa-volume-up';
  }
  volumeValue = value;
  video.volume = value;
  if (video.volume === 0) {
    video.muted = true;
    muteBtnIcon.classList = 'fas fa-volume-mute';
  }
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
    playBtnIcon.classList = 'fas fa-play';
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
    fullScreenBtnIcon.classList = 'fas fa-expand';
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtnIcon.classList = 'fas fa-expand';
  }
};

const hideControls = () => {
  videoControls.classList.remove('showing');
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

const handleEnded = () => {
  const { video_id: id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: 'POST',
  });
};

playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMute);
volumeRange.addEventListener('input', handleVolumeChange);
timeline.addEventListener('input', handleTimelineChange);
timeline.addEventListener('change', handleTimelineSet);
fullScreenBtn.addEventListener('click', handleFullscreen);
video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('timeupdate', handleTimeUpdate);
video.addEventListener('mousemove', handleMouseMove);
video.addEventListener('mouseleave', handleMouseLeave);
video.addEventListener('ended', handleEnded);
video.addEventListener('click', (e) => {
  handlePlayClick();
});
window.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    handlePlayClick();
  }
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'm') {
    handleMute();
  }
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'f') {
    handleFullscreen();
  }
});
