(function () {
  var app = angular.module( 'top-donor', [] );

  app.controller( 'topDonorCtrl', function( $scope, $http ) {
    var queryStringVars = GLOBALS.getUrlVars();
    var teamId = queryStringVars['id'];
    var topX = queryStringVars['topX'];

    var GetTopDonors = function(data) {
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
    };

    var SetTopDonors = function(data, expectedLength) {
      if (data.length === expectedLength) {
        $scope.topDonors = GetTopDonors(data);
        $scope.$apply();
      }
    };

    var GetAllDonorInfo = function(data) {
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
          SetTopDonors(donationInfo, numParticipants);
        }, function (data) {
          donationInfo.push([]);
          SetTopDonors(donationInfo, numParticipants);
        });
      });
    }

    var GetTeamInfo = function(data) {
      console.log(JSON.stringify(data));
      $scope.groupName = data.name.toUpperCase();
      $scope.$apply();
    };

    var Error = function(data) {
      console.log('WriteError: ' + JSON.stringify(data));
    };

    var Update = function() {
      $scope.groupName = $scope.topDonors = undefined;
      GLOBALS.GET_TEAM_INFO(teamId, GetTeamInfo, Error);
      GLOBALS.GET_TEAM_PARTICIPANTS_INFO(teamId, GetAllDonorInfo, Error);
    };

    // UpdateInfo immediately, and then once every 10 seconds.
    Update();
    window.setInterval(Update, 10000);
  });
})();
