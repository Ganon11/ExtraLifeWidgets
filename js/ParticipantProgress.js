function UpdateInfo() {
    var participantId = GLOBALS.PARTICIPANT_ID;
    var personalData = GLOBALS.GET_PARTICIPANT_INFO(participantId);
    console.log(personalData);
    var donationData = GLOBALS.GET_PARTICIPANT_DONATION_INFO(participantId);
    console.log(donationData);
}