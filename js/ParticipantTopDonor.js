$(document).ready(function () {
  // UpdateInfo immediately, and then once every 10 seconds.
  UpdateInfo();
  window.setInterval(UpdateInfo, 10000);
});

function GetTopDonors(data, topX) {
  // First, sum all the donations for each name.
  var groupedData = {};
  $.each(data, function(i, val) {
    var name = val.donorName;
    var amount = val.donationAmount;
    if (groupedData.name !== undefined) {
      groupedData[name] += amount;
    } else {
      groupedData[name] = amount;
    }
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

  // Now return the top X
  return sortedData.slice(0, topX);
}

function WriteTopDonor(data) {
  var topX = GLOBALS.getUrlVars()["topX"] || 3;
  var topDonors = GetTopDonors(data, topX);
  console.log(JSON.stringify(topDonors));
}

function WriteError(data) {
  console.log('WriteError: ' + JSON.stringify(data));
  $('#widget').html('Could not fetch donation info');
}

function UpdateInfo() {
  var participantId = GLOBALS.getUrlVars()["id"];
  GLOBALS.GET_PARTICIPANT_DONATION_INFO(participantId, WriteTopDonor, WriteError);
}