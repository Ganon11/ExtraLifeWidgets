
var app = angular.module('RecentDonations', []);
app.controller('RecentDonationsControl', function($scope) {
    

    GLOBALS.GET_PARTICIPANT_INFO(160204, function(data) {
      $scope.displayName = data["firstName"]
      $scope.$apply()
    }, function(error) {
      // Make it display something sad
      $scope.contributors = []
      $scope.error = [{message:"Couldn't get participant info: " + error}]
      $scope.$apply()
    })

    $scope.contributors = []

    update = function() {
      GLOBALS.GET_PARTICIPANT_DONATION_INFO(160204, function(data) {

        // Success, hide any error message
        $scope.error = ''

        // Clear the array
        $scope.contributors = []

        // Go through the array of contributors, and add them to our array
        for (var i = 0; i < data.length; i++) {
          $scope.contributors.push({
            name: data[i].donorName,
            amount: "$" + data[i].donationAmount.toFixed(2),
            message: data[i].message,
            date: data[i].createdOn
          })
        }

        if ($scope.contributors.length == 0) {
          $scope.error = "No contributors yet"
        }

      // Refresh after updating the scope
      $scope.$apply()

      }, function(error) {
        // Make it display something sad
        $scope.contributors = []
        $scope.error = [{message:"Couldn't get donation info: " + error}]
        $scope.$apply()
      })
    }

    update()

    // Get new data from the server every 30s
    setInterval( function() { 
      update()
    }, 30)
});
