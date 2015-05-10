var player;
var API_KEY = 'AIzaSyAtCv37HZUzW9jeWv5X8-9IjPddeEil_Dc';
var searchList = {};


$('.collapse-search-toggle').click(function() {
  var target = $('.search-panel');
  
  target.toggleClass('collapsed');
});


$('#query').keyup(function (event) {
  var key = event.keyCode || event.which;

  if (key === 13) {
    search();
  }
});


$(document).on('click', '#search-result li', function() {
  var videoId = $(this).data('video-id');
  
  addToPlaylist(videoId);
  
  $('.search-panel').addClass('collapsed');
  
});


function buildVideoInfo(videoId) {
  
  var videoInfo = $('.video-info'),
      video = searchList[videoId];
  
  videoInfo.removeClass('hide');
  
  videoInfo.find('.video-title').text(video.title);
  videoInfo.find('.video-channel').text(video.channelTitle);
  videoInfo.find('.video-views').text(video.viewCount);
  
}


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
  
  if(player.getPlayerState() !== 1 && listItem.index() === 0) {
    $('#playlist li').first().trigger('click');
  }
  
}


$(document).on('click', '#playlist li', function() {
  var videoId = $(this).data('video-id');
  player.loadVideoById({ videoId: videoId });
  $(this).addClass('active').siblings().removeClass('active');
  
  buildVideoInfo(videoId);
});


$(document).on('click', '#remove-item', function(e) {
  e.stopPropagation();
  
  $(this).closest('.playlist-item').remove();
});