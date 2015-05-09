
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
  
  player.loadVideoById({ videoId: videoId });
});