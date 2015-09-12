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

    return sortedData[sortedData.length - 1];
}

function WriteTopDonor(data, expectedLength) {
    if (data.length === expectedLength) {
        // Do the thing!
        data.sort(function(a, b) {
            a = a[1];
            b = b[1];
            return a > b ? -1 : (a < b ? 1 : 0);
        });
        var topX = GLOBALS.getUrlVars()["topX"] || 3;
        var topDonors = data.slice(0, topX);
        $('#widget').html(topDonor[0] + ': $' + topDonor[1].toFixed(2));
    }
}

function GetAllDonorInfo(data) {
    var donationInfo = [];
    var numParticipants = data.length;
    $.each(data, function(i, val) {
        var id = val.participantID;
        var name = val.firstName + ' ' + val.lastName;
        GLOBALS.GET_PARTICIPANT_DONATION_INFO(id, function (data) {
            if (data.length === 0) {
                donationInfo.push(['N/A', 0]);
            } else {
                donationInfo.push(GetTopDonor(data));
            }
            WriteTopDonor(donationInfo, numParticipants);
        }, function (data) {
            donationInfo.push(['N/A', 0]);
            WriteTopDonor(donationInfo, numParticipants);
        });
    });
}

function WriteError(data) {
    console.log('WriteError: ' + JSON.stringify(data));
    $('#widget').html('Could not fetch donation info');
}

function UpdateInfo() {
    var teamId = GLOBALS.getUrlVars()["id"];
    GLOBALS.GET_TEAM_PARTICIPANTS_INFO(teamId, GetAllDonorInfo, WriteError);
}