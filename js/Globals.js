var GLOBALS = {
  PROXY_URL_FORMAT: 'https://jsonp.afeld.me/?url=',
  EXTRA_LIFE_URL_FORMAT: escape('http://www.extra-life.org/index.cfm?format=json&fuseaction='),
  TEAM_URL_FORMAT: escape('donorDrive.team&teamID='),
  TEAM_PARTICIPANTS_URL_FORMAT: escape('donorDrive.teamParticipants&teamID='),
  PARTICIPANT_URL_FORMAT: escape('donorDrive.participant&participantID='),
  PARTICIPANT_DONATIONS_URL_FORMAT: escape('donorDrive.participantDonations&participantID='),

  GET_TEAM_URL: function(teamId) {
    return GLOBALS.PROXY_URL_FORMAT + GLOBALS.EXTRA_LIFE_URL_FORMAT + GLOBALS.TEAM_URL_FORMAT + teamId;
  },

  GET_TEAM_PARTICIPANTS_URL: function(teamId) {
    return GLOBALS.PROXY_URL_FORMAT + GLOBALS.EXTRA_LIFE_URL_FORMAT + GLOBALS.TEAM_PARTICIPANTS_URL_FORMAT + teamId;
  },

  GET_PARTICIPANT_URL: function(participantId) {
    return GLOBALS.PROXY_URL_FORMAT + GLOBALS.EXTRA_LIFE_URL_FORMAT + GLOBALS.PARTICIPANT_URL_FORMAT + participantId;
  },

  GET_PARTICIPANT_DONATIONS_URL: function(participantId) {
    return GLOBALS.PROXY_URL_FORMAT + GLOBALS.EXTRA_LIFE_URL_FORMAT + GLOBALS.PARTICIPANT_DONATIONS_URL_FORMAT + participantId;
  },

  GET_TEAM_INFO: function(id, success, error) {
    $.ajax({
      url: GLOBALS.GET_TEAM_URL(id),
      data: {},
      type: 'GET',
      dataType: 'json',
      success: success,
      error: error
    });
  },

  GET_TEAM_PARTICIPANTS_INFO: function(id, success, error) {
    $.ajax({
      url: GLOBALS.GET_TEAM_PARTICIPANTS_URL(id),
      data: {},
      type: 'GET',
      dataType: 'json',
      success: success,
      error: error
    });
  },

  GET_PARTICIPANT_INFO: function(id, success, error) {
    var myUrl = GLOBALS.GET_PARTICIPANT_URL(id);
    $.ajax({
      url: myUrl,
      data: {},
      type: 'GET',
      dataType: 'json',
      success: success,
      error: error
    });
  },

  GET_PARTICIPANT_DONATION_INFO: function(id, success, error) {
    $.ajax({
      url: GLOBALS.GET_PARTICIPANT_DONATIONS_URL(id),
      data: {},
      type: 'GET',
      dataType: 'json',
      success: success,
      error: error
    });
  },
  
  //copied from http://papermashup.com/read-url-get-variables-withjavascript/
  getUrlVars: function() {
    var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
      });
    return vars;
  }
};
