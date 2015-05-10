// Upon loading, the Google APIs JS client automatically invokes this callback.

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
}

// Search for a specified string.
function search() {
  
  console.log('search');
  
  
  
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 20
  });
  
  request.execute(buildSearchList);
  
}


function buildSearchList(data) {
  console.log(data);
  
  clearSearchResults();
    
  var list = [],
      videoIdArray = [];

  for(var i in data.items) {

    var item = data.items[i];
    

    var itemContainer = $('<li>', { 
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

    itemContainer.append(itemThumb).append(itemInfo);

    list.push(itemContainer.prop('outerHTML'));
    
    //
    videoIdArray.push(item.id.videoId);
    searchList[item.id.videoId] = {
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId
    };

  }

  $('#search-result').append(list.join(''));

  getVideoStats(videoIdArray);
  
}


function getVideoStats(videoIdArray) {
  
  var vidStatsUrl = [
    'https://www.googleapis.com/youtube/v3/videos?',
    'part=statistics',
    '&id=' + videoIdArray.join(','),
    '&key=' + API_KEY
  ];

  $.getJSON(vidStatsUrl.join(''), function(response) {
    console.log('resp', response);

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


function clearSearchResults() {
  $('#search-result').empty();
}
