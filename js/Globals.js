var GLOBALS = {
    // Edit these to your Participant/Team ID
    TEAM_ID:                          '20954',
    PARTICIPANT_ID:                   '141729',

    // Leave these alone!
    TEAM_URL_FORMAT:                  'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&format=json&teamID=%s',
    TEAM_PARTICIPANTS_URL_FORMAT:     'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.teamParticipants&format=json&teamID=%s',
    PARTICIPANT_URL_FORMAT:           'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&format=json&participantID=%s',
    PARTICIPANT_DONATIONS_URL_FORMAT: 'http://www.extra-life.org/index.cfm?fuseaction=donorDrive.participantDonations&format=json&participantID=%s',

    GET_TEAM_URL: function(teamId) {
        return sprintf(GLOBALS.TEAM_URL_FORMAT, teamId);
    },

    GET_TEAM_PARTICIPANTS_URL: function(teamId) {
        return sprintf(GLOBALS.TEAM_PARTICIPANTS_URL_FORMAT, teamId);
    },

    GET_PARTICIPANT_URL: function(participantId) {
        return sprintf(GLOBALS.PARTICIPANT_URL_FORMAT, participantId);
    },

    GET_PARTICIPANT_DONATIONS_URL: function(participantId) {
        return sprintf(GLOBALS.PARTICIPANT_DONATIONS_URL_FORMAT, participantId);
    },

    GET_TEAM_INFO = function(id) {
        $.get(
            url: GLOBALS.GET_TEAM_URL(id),
            data: {},
            success: function(data, textStatus, jqXHR) {
                return data;
            }
        );
    },

    GET_TEAM_PARTICIPANTS_INFO = function(id) {
        $.get(
            url: GLOBALS.GET_TEAM_PARTICIPANTS_URL(id),
            data: {},
            success: function(data, textStatus, jqXHR) {
                return data;
            }
        );
    },

    GET_PARTICIPANT_INFO = function(id) {
        $.get(
            url: GET_PARTICIPANT_URL(id),
            data: {},
            success: function(data, textStatus, jqXHR) {
                return data;
            }
        );
    },

    GET_PARTICIPANT_DONATION_INFO = function(id) {
        $.get(
            url: GET_PARTICIPANT_DONATION_URL(id),
            data: {},
            success: function(data, textStatus, jqXHR) {
                return data;
            }
        );
    }
};
