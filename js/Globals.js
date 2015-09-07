var GLOBALS = {
    // Edit these to your Participant/Team ID
    TEAM_ID:                          '20954',
    PARTICIPANT_ID:                   '141729',

    // Leave these alone!
    TEAM_URL_FORMAT:                  'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&format=json&teamID=',
    TEAM_PARTICIPANTS_URL_FORMAT:     'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.teamParticipants&format=json&teamID=',
    PARTICIPANT_URL_FORMAT:           'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&format=json&participantID=',
    PARTICIPANT_DONATIONS_URL_FORMAT: 'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.participantDonations&format=json&participantID=',

    GET_TEAM_URL: function(teamId) {
        return GLOBALS.TEAM_URL_FORMAT + teamId;
    },

    GET_TEAM_PARTICIPANTS_URL: function(teamId) {
        return GLOBALS.TEAM_PARTICIPANTS_URL_FORMAT + teamId;
    },

    GET_PARTICIPANT_URL: function(participantId) {
        return GLOBALS.PARTICIPANT_URL_FORMAT + participantId;
    },

    GET_PARTICIPANT_DONATIONS_URL: function(participantId) {
        return GLOBALS.PARTICIPANT_DONATIONS_URL_FORMAT + participantId;
    },

    GET_TEAM_INFO: function(id) {
        $.get(GLOBALS.GET_TEAM_URL(id), {}, function(data, textStatus, jqXHR) {
            return data;
        });
    },

    GET_TEAM_PARTICIPANTS_INFO: function(id) {
        $.get(GLOBALS.GET_TEAM_PARTICIPANTS_URL(id), {}, function(data, textStatus, jqXHR) {
            return data;
        });
    },

    GET_PARTICIPANT_INFO: function(id) {
        $.get(GLOBALS.GET_PARTICIPANT_URL(id), {}, function(data, textStatus, jqXHR) {
            return data;
        });
    },

    GET_PARTICIPANT_DONATION_INFO: function(id) {
        $.get(GLOBALS.GET_PARTICIPANT_DONATIONS_URL(id), {}, function(data, textStatus, jqXHR) {
            return data;
        });
    }
};
