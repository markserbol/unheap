// some variables needed to be globally accessible
var player,
    API_KEY = 'AIzaSyAtCv37HZUzW9jeWv5X8-9IjPddeEil_Dc',
    searchList = {};


// Search panel toggle button click handler
// shows and hides the search panel on mobile view
$('.collapse-search-toggle').click(function() {
  var target = $('.search-panel');
  
  target.toggleClass('collapsed');
});


// On search input keyup event to submit perform search 
// when user hits `enter/return` key
$('#query').keyup(function (event) {
  var key = event.keyCode || event.which;

  if (key === 13) {
    search();
  }
});


// Add the search item to the playlist when clicks on the item
$(document).on('click', '#search-result .search-result-item', function() {
  var videoId = $(this).data('video-id');
  
  addToPlaylist(videoId);
  
  $('.search-panel').addClass('collapsed');
  
});


// Play the video and update video info 
// when user clicks on the playlist item
$(document).on('click', '#playlist .playlist-item', function() {
  var videoId = $(this).data('video-id');
  
  player.loadVideoById({
    videoId: videoId,
    suggestedQuality: 'large'
  });
  
  $(this).addClass('active').siblings().removeClass('active');
  
  buildVideoInfo(videoId);
});


// Remove an item to the playlist on user click.
$(document).on('click', '#remove-item', function(e) {
  e.stopPropagation();
  
  $(this).closest('.playlist-item').remove();
});


// On document ready apply the `sortable` plugin on the playlist
$(document).ready(function() {
  Sortable.create(document.getElementById('playlist'));
});


// Function that updates the video info by passing only the `videoId`.
function buildVideoInfo(videoId) {
  
  var videoInfo = $('.video-info'),
      video = searchList[videoId];
  
  videoInfo.removeClass('hide');
  
  videoInfo.find('.video-title').text(video.title);
  videoInfo.find('.video-channel').text(video.channelTitle);
  videoInfo.find('.video-views').text(video.viewCount);
  
}


// Adds the video item to the playlist
function addToPlaylist(videoId) {
  
  var video = searchList[videoId],
      listItem = $('<li>', {
        'class': 'playlist-item',
        'data-video-id': videoId
      }),
      listItemThumb = $('<img>', { 
        'class': 'video-thumbnail',
        src: video.thumbnail
      }),
      listItemTitle = $('<h3>', {
        'class': 'video-title',
        text: video.title
      }),
      listItemControls = $('<div>', {
        'class': 'controls',
        html: '<span id="remove-item"><i class="fa fa-close"></i></span>'
      });
  
  listItem.append(listItemThumb, [listItemTitle, listItemControls]);
  
  $('#playlist').append(listItem);
  
  // If the newly added video is the first on the playlist,
  // trigger a click on this item to play the video.
  if(player.getPlayerState() !== 1 && listItem.index() === 0) {
    $('#playlist .playlist-item').first().trigger('click');
  }
  
}