$(document).ready(function () {
  // UpdateInfo immediately, and then once every 10 seconds.
  UpdateInfo();
  window.setInterval(UpdateInfo, 10000);
});

function GetTopDonors(data, topX) {    
  // Need to flatten into an map of name: value
  var groupedData = {};
  $.each(data, function(i, val) {
    // val is an array of "donor objects": { "name": name, "value": value }
    $.each(val, function(i, donor) {
      var name = donor.name;
      var amount = donor.value;
      if (groupedData.name !== undefined) {
        groupedData[name] += amount;
      } else {
        groupedData[name] = amount;
      }
    });
  });

  // Next, transform it into an array of { Name, Value } objects to sort
  var sortedData = [];
  for (var k in groupedData) {
    sortedData.push({
      name: k,
      value: groupedData[k]
    });
  }

  // Finally, sort dat shit! Descending order kthxbai
  sortedData.sort(function(a, b) {
    a = a.value;
    b = b.value;
    return a > b ? -1 : (a < b ? 1 : 0);
  });

  return sortedData.slice(0, topX);
}

function WriteTopDonor(data, expectedLength) {
  if (data.length === expectedLength) {
    var topX = GLOBALS.getUrlVars()["topX"] || 3;
    var topDonors = GetTopDonors(data, topX);
    console.log(JSON.stringify(topDonors));
    //$('#widget').html(topDonor[0] + ': $' + topDonor[1].toFixed(2));
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
        donationInfo.push([]);
      } else {
        var massagedData = data.map(function(item) {
          return {
            name: item["donorName"],
            value: item["donationAmount"]
          };
        });
        donationInfo.push(massagedData);
      }
      WriteTopDonor(donationInfo, numParticipants);
    }, function (data) {
      donationInfo.push([]);
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