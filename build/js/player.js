// Load the Iframe Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
   // height: '390',
    width: '640',
    playerVars: {rel: 0, theme: 'light', color: 'white'},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}


// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.playVideo();
}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
//    setTimeout(stopVideo, 6000);
//    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}