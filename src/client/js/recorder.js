const StartBtn = document.querySelector('#startBtn');
const video = document.querySelector('#preview');

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement('a');
  a.href = videoFile;
  a.download = 'MyRecording';
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  StartBtn.innerText = 'Download Recording';
  StartBtn.removeEventListener('click', handleStop);
  StartBtn.addEventListener('click', handleDownload);
  recorder.stop();
};

const handleStart = () => {
  StartBtn.innerText = 'Stop Recording';
  StartBtn.removeEventListener('click', handleStart);
  StartBtn.addEventListener('click', handleStop);
  recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const init = async (e) => {
  StartBtn.innerText = 'Start Recording';
  StartBtn.removeEventListener('click', onCamera);
  StartBtn.addEventListener('click', handleStart);
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
  video.play();
};

const onCamera = () => {
  init();
};

StartBtn.addEventListener('click', onCamera);
