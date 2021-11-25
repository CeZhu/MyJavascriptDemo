const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = ["hey", "summer", "ukulele"];
audio.volume = 0.1;

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function toggleMusic() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function playSong() {
  audio.play();
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
}

function pauseSong() {
  audio.pause();
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
}

function updateProgress(){
  const curr = (audio.currentTime / audio.duration);
  progress.style.width = curr*100 +"%";
}

function setProgress(e){
  const clickX = e.offsetX;
  const width = this.clientWidth;
  console.log(width);
  const duration = audio.duration;
  audio.currentTime = clickX / width * duration;
}

function prevSong(){
  songIndex--;
  if(songIndex<0) songIndex = songs.length-1;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong(){
  songIndex++;
  if(songIndex>=songs.length) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

playBtn.addEventListener("click", toggleMusic);
audio.addEventListener("timeupdate",updateProgress);
progressContainer.addEventListener("click",setProgress);
prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click",nextSong);