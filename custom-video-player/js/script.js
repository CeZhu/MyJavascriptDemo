const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let min = Math.floor(video.currentTime / 60);
  if (min < 10) {
    min = "0" + min;
  }
  let sec = Math.floor(video.currentTime % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }

  
  let total_min = Math.floor(video.duration / 60);
  if (total_min < 10) {
    total_min = "0" + total_min;
  }
  let total_sec = Math.floor(video.duration % 60);
  if (total_sec < 10) {
    total_sec = "0" + total_sec;
  }
  timestamp.innerText = `${min}:${sec}/${total_min}:${total_sec}`;
}

function setProgress() {
  video.currentTime = +progress.value * 60;
}

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
play.addEventListener("click", updatePlayIcon);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setProgress);
