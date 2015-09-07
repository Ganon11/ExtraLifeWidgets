var globals = {
	TEAM_ID = 							'20954',
	PARTICIPANT_ID = 					'141729',
	TEAM_URL_FORMAT = 					sprintf('http://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=%s&format=json', TEAM_ID),
	TEAM_PARTICIPANTS_URL_FORMAT = 		sprintf('http://www.extra-life.org/index.cfm?fuseaction=donorDrive.teamParticipants&teamID=%s&format=json', TEAM_ID)
	PARTICIPANT_URL_FORMAT = 			sprintf('http://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=%s&format=json', PARTICIPANT_ID),
	PARTICIPANT_DONATIONS_URL_FORMAT = 	sprintf('http://www.extra-life.org/index.cfm?fuseaction=donorDrive.participantDonations&participantID=141729', PARTICIPANT_ID)
};