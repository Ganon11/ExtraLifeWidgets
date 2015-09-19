var GLOBALS = {
  // Edit these to your Participant/Team ID
  TEAM_ID:              '20954',
  PARTICIPANT_ID:           '141729',

  // Leave these alone!
  PROXY_URL_FORMAT: 'https://jsonp.afeld.me/?url=',
  TEAM_URL_FORMAT: 'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&format=json&teamID=',
  TEAM_PARTICIPANTS_URL_FORMAT: 'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.teamParticipants&format=json&teamID=',
  PARTICIPANT_URL_FORMAT: 'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&format=json&participantID=',
  PARTICIPANT_DONATIONS_URL_FORMAT: 'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.participantDonations&format=json&participantID=',

  GET_TEAM_URL: function(teamId) {
    return GLOBALS.PROXY_URL_FORMAT + GLOBALS.TEAM_URL_FORMAT + teamId;
  },

  GET_TEAM_PARTICIPANTS_URL: function(teamId) {
    return GLOBALS.PROXY_URL_FORMAT + GLOBALS.TEAM_PARTICIPANTS_URL_FORMAT + teamId;
  },

  GET_PARTICIPANT_URL: function(participantId) {
    return GLOBALS.PROXY_URL_FORMAT + GLOBALS.PARTICIPANT_URL_FORMAT + participantId;
  },

  GET_PARTICIPANT_DONATIONS_URL: function(participantId) {
    return GLOBALS.PROXY_URL_FORMAT + GLOBALS.PARTICIPANT_DONATIONS_URL_FORMAT + participantId;
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
