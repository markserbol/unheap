// Load the Iframe Player API code asynchronously.
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '640',
    playerVars: {rel: 0, theme: 'light', color: 'white'},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}


//The API will call this function when the video player is ready.
function onPlayerReady(event) {
  $('body').addClass('player-ready');
}


// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  // When the video ended load the next video on the playlist.
  if (event.data === YT.PlayerState.ENDED) {
    var nextVideo = $('#playlist').find('.active').next();
    
    if(nextVideo) {
      nextVideo.trigger('click');
    }
  }
}