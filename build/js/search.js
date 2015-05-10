// Upon loading, the Google APIs JS client invokes this callback.
googleApiClientReady = function() {
  gapi.client.setApiKey(API_KEY);
  loadAPIClientInterfaces();
};

// Load the client interfaces for the YouTube Analytics and Data APIs, 
// which are required to use the Google APIs JS client.
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}


// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#query').attr('disabled', false);
  $('body').addClass('search-ready');
}


// Search for a specified string.
function search() {
  gapi.client.youtube.search.list({
    q: $('#query').val(),
    part: 'snippet',
    maxResults: 20
  }).execute(buildSearchList); 
}


// Build the search result list
function buildSearchList(data) {
  // clear previous search results
  clearSearchResults();
    
  var list = [],
      videoIdArray = [];

  // Loop through the items and append on the result list.
  for(var i in data.items) {

    var item = data.items[i],
        
        itemContainer = $('<li>', { 
          id: item.id.videoId,
          'data-video-id': item.id.videoId,
          'data-video-title': item.snippet.title,
          'class': 'search-result-item'
        }),

        itemThumb = $('<img>', {
          src: item.snippet.thumbnails.default.url
        }),

        itemInfo = $('<div>', {
          'class': 'item-info',
          html: [
            '<h3 class="title">' + item.snippet.title + '</h3>',
            '<span class="channel">by ' + item.snippet.channelTitle + '</span>',
            '<span class="views"></span>'
          ].join('')
        });

    itemContainer.append(itemThumb, [itemInfo]);

    list.push(itemContainer.prop('outerHTML'));
    
    // Add the video data in a global object
    searchList[item.id.videoId] = {
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId
    };
    
    // Push the id to the array, which later on needed for video query.
    videoIdArray.push(item.id.videoId);

  }

  // Append all the results in the list
  $('#search-result').append(list.join(''));

  // The search list API does not include the video stats.
  // Since we need to show the view count we need perform a video query
  getVideoStats(videoIdArray);
  
}


// Perform a GET JSON video query to request the video statistics.
function getVideoStats(videoIdArray) {
  
  var vidStatsUrl = [
    'https://www.googleapis.com/youtube/v3/videos',
    '?part=statistics',
    '&id=' + videoIdArray.join(','),
    '&key=' + API_KEY
  ].join('');

  $.getJSON(vidStatsUrl, function(response) {

    // Loop through the items and append the data on the search result.
    for(var i in response.items) {
      var item = response.items[i],
          viewCount = item.statistics.viewCount;

      $('#' + item.id)
        .attr('data-video-views', viewCount)
        .data('video-views', viewCount)
        .find('.views').html(viewCount + ' views');
      
      searchList[item.id].viewCount = viewCount;
    }

  });
  
}


// A helper function for clearing the search list.
function clearSearchResults() {
  $('#search-result').empty();
}
