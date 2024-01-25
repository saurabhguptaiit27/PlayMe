
// Initialize the Variables
let home = document.getElementById('home');
let about = document.getElementById('about');
let contact = document.getElementById('contactus');
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: " A long way", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Abstract future", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Baby Mandala", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Dont Stop Me", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Glossy", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Once in Paris", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Deep future", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Science Docs", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Titanium", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Trap future bass", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]
home.addEventListener('click', function () {
    openNewTab('index.html');
});
about.addEventListener('click', function () {
    openNewTab('about.html');
});
contact.addEventListener('click', function () {
    openNewTab('contact.html');
});

function openNewTab(page) {
    window.open(page, '_blank');
}



songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    console.log(element.getElementsByClassName("songName")[0]);
    console.log(element.getElementsByTagName("img")[0]);
})


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('volumeoff').addEventListener('click', () => {
    audioElement.volume = 0;
})
document.getElementById('volumelow').addEventListener('click', () => {
    audioElement.volume = 0.2;
})
document.getElementById('volumehigh').addEventListener('click', () => {
    audioElement.volume = 1;
})


document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', function () {
        searchOnPixabay();
    });

    function searchOnPixabay() {
        const searchInput = document.getElementById('search').value;
        const pixabaySearchURL = `https://pixabay.com/music/search/${encodeURIComponent(searchInput)}%20music`;

        // Open the search results in a new tab/window
        window.open(pixabaySearchURL, '_blank');
    }
});