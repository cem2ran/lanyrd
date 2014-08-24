"use strict";
require('github:lhorie/mithril.js');

var unwrapSectionsRows = function(body) {
  var merged = [];
  for (var i = 0; i < body.sections.length; i++) {
    merged = merged.concat(body.sections[i].rows);
  }
  return merged;
};

var unwrapSectionRows = function(body) {
  return body.sections[0].rows;
};

var unwrapFutureEvents = function(body) {
  return body.events;
};

var _GET = function(path, unwrapSuccess, unwrapError) {
  return m.request({
    method: 'GET',
    url: Lanyrd.BASE_URL + path,
    config: function(xhr) {
      xhr.setRequestHeader('X-Lanyrd-Auth', Math.random().toString());
      xhr.setRequestHeader('Origin', location.host ? location.host : 'localhost');
    },
    extract: function(xhr) {
      return xhr.status > 200 ? JSON.stringify(xhr.responseText) : xhr.responseText;
    },
    unwrapSuccess: unwrapSuccess,
    unwrapError: unwrapError
  });
};

var Lanyrd = {
  BASE_URL: 'http://localhost:8080/lanyrd.com/mobile/ios2/',
  popular: function() {
    return _GET('search/', unwrapSectionRows);
  },
  /* //api broken
  search: function(query) {
    return _GET('search/?query=' + query, unwrapSectionRows);
  },
  */
  event: function(year, slug) {
    return _GET(year + '/' + slug + '/');
  },
  speakers: function(year, slug) {
    return _GET(year + '/' + slug + '/speakers/', unwrapSectionsRows);
  },
  attendees: function(year, slug) {
    return _GET(year + '/' + slug + '/attendees/', unwrapSectionsRows);
  },
  schedule: function(year, slug) {
    return _GET(year + '/' + slug + '/schedule/', unwrapSectionsRows);
  },
  profile: function(username) {
    return _GET('profile/' + username + '/');
  },
  futureEvents: function(username) {
    return _GET('profile/' + username + '/action/', unwrapFutureEvents);
  }
};

module.exports = Lanyrd;
