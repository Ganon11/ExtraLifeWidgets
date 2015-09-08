$(document).ready(function () {
    // UpdateInfo immediately, and then once every 10 seconds.
    UpdateInfo();
    window.setInterval(UpdateInfo, 10000);
});

function GetTopDonor(data) {    
    var groupedData = {};
    $.each(data, function(i, val) {
        var name = val.donorName;
        var amount = val.donationAmount;
        if (groupedData.hasOwnProperty(name)) {
            groupedData[name] += amount;
        } else {
            groupedData[name] = amount;
        }
    });

    var sortedData = [];
    for (var k in groupedData) sortedData.push([k, groupedData[k]]);
    sortedData.sort(function(a, b) {
        a = a[1];
        b = b[1];
        return a < b ? -1 : (a > b ? 1 : 0);
    });

    return sortedData[0];
}

function WriteTopDonor(data) {
    var topDonor = GetTopDonor(data);
    $('#widget').html(topDonor[0] + ': $' + topDonor[1].toFixed(2));
}

function WriteError(data) {
    console.log('WriteError: ' + JSON.stringify(data));
    $('#widget').html('Could not fetch donation info');
}

function UpdateInfo() {
    var participantId = GLOBALS.PARTICIPANT_ID;
    GLOBALS.GET_PARTICIPANT_DONATION_INFO(participantId, WriteTopDonor, WriteError);
}