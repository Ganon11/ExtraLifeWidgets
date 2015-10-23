(function () {
  var app = angular.module( 'top-donor', [] );

  app.controller( 'topDonorCtrl', function( $scope, $http ) {
    var queryStringVars = GLOBALS.getUrlVars();
    var userId = queryStringVars['id'];
    var topX = queryStringVars['topX'] || 3;

    var GetTopDonors = function(data) {
      // First, sum all the donations for each name.
      var groupedData = {};
      $.each(data, function(i, val) {
        var name = val.donorName || "Anonymous";
        if (groupedData.name !== undefined) {
          groupedData[name] += val.donationAmount;
        } else {
          groupedData[name] = val.donationAmount;
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
        return b.value - a.value;
      });

      // Now return the top X
      $scope.topDonors = sortedData.slice(0, topX);
      $scope.$apply();
    };

    var GetUserInfo = function(data) {
      $scope.name = data.firstName.toUpperCase();
      $scope.$apply();
    };

    var Error = function(data) {
      console.log('WriteError: ' + JSON.stringify(data));
    };

    var Update = function() {
      GLOBALS.GET_PARTICIPANT_INFO(userId, GetUserInfo, Error)
      GLOBALS.GET_PARTICIPANT_DONATION_INFO(userId, GetTopDonors, Error);
    };

    // UpdateInfo immediately, and then once every 30 seconds.
    Update();
    window.setInterval(Update, 30000);
  });
})();
