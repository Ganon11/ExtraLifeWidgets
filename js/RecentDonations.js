(function() {
var app = angular.module('RecentDonations', []);
app.controller('RecentDonationsControl', function($scope) {

    var urlVars = GLOBALS.getUrlVars();
    var uid = urlVars['id'];
    var isTeam = urlVars['team'];
    var updateEvery = urlVars['update'];
    if (updateEvery === undefined) { updateEvery = 10; }

    var count = Number(urlVars['count']);
    if (count === undefined) { count = 5; }

    var messageTruncateLength = 150;

    var contributions = [];
    var waitingOn = 0;

    var messageBeingRead = -1;

    $scope.contributions = [];
    $scope.errors = [];

    $scope.message = "";

    // Use this to add an error to the stack to display.
    var showError = function(problem, error) {
      if (error) {
        $scope.errors.push(problem + ": " + error);
      } else {
        $scope.errors.push(problem);
      }
      dataChanged();
    }
    
    // Called whenever our data is updated by callbacks.
    var dataChanged = function() {
      // Only update once all our callbacks have added their data.
      if (waitingOn == 0) {
        
      /* // Some test data.
        contributions = [
        {
          name: "Alex Karantza",
          date: Date.parse("07 05 1988"),
          amount: "$100.00",
          message: "I am the very model of a modern major general, Ive information vegetable animal and mineral; I know the kings of england and I quote the fights historical, from marathon to waterloo in order catagorical",
        },
        {
          name: "Mike Stark",
          date: Date.parse("08 01 1994"),
          amount: "$99.00",
          message: "DOUBLE HEAD",
        },
        {
          name: "Adina Rubinoff",
          date: Date.parse("10 18 1989"),
          amount: "$101.00",
          message: null,
        },
        ]
        */

        // Sort all our contributions
        contributions.sort(function(a,b) { 
          return b.date - a.date;
        });
    
        var subset = contributions.slice(0, count);

        // And send the latest 'count' to the UI.
        $scope.contributions = subset;
        $scope.$apply();


        // Now let's get a message from those contributors, if we can
        if (subset.length > 0) {

          // Starting after our current message, look and see if there's another message to display (wrapping back to the first if necessary)
          for (var i = 1; i <= subset.length; i++) {
            var idx = (messageBeingRead + i) % subset.length;
            var donation = subset[idx];
            // If there is one, display it.
            if (donation.message) { 
              // Twitter rules.
              var message = donation.message;
              if (message.length > messageTruncateLength) { 
                message = message.substr(0,messageTruncateLength - 3) + "...";
              }

              if (messageBeingRead !== idx) {
                displayMessage (donation.name + ": " + message);
                messageBeingRead = idx;
              }

              break
            }
          }
        }
      }
    }

    // Animate a new message onto the page.
    var displayMessage = function(message) {
      $('#message').fadeOut(500, function() { 
        $scope.message = message;
        $scope.$apply();
        $('#message').fadeIn(500);
      });
    }

    // Gets the name (and IDs) of the requested user(s)
    var getParticipantIDs = function(onComplete) {
      if (isTeam) { 
        // We need the name of the team, and the list of members.
        GLOBALS.GET_TEAM_INFO(uid, function(data) {
          if (data.name === undefined) {
            $scope.displayName = "(Invalid ID)"
          } else {
            $scope.displayName = data.name
          }

          // Display the name to the UI.
          $scope.$apply();
        }, function (error) {
          showError("Could not get team info", error);
        });

        GLOBALS.GET_TEAM_PARTICIPANTS_INFO(uid, function(data) {
          members = $.map(data, function(x,i) {
            return x.participantID;
          });

          onComplete();
        }, function (error) {
          showError("Could not get team participant info", error);
        });

      } else {

        // This is an individual
        members = [uid];
        
        GLOBALS.GET_PARTICIPANT_INFO(uid, function(data) {
          $scope.displayName = data["firstName"] || "(Invalid ID)";
          dataChanged();
        }, function(error) {
          $scope.displayName = "?";
          showError("Couldn't get participant info", error);
        });

        onComplete();
      }
    }

    // When info about a single participant arrives, add their donations to our list.
    var handleParticipantDonationInfo = function(data) {
      // Go through the array of contributors for this user, and add them to our array
      var newContributions = $.map(data, function(x, i) {
        return {
          name: x.donorName,
          amount: "$" + x.donationAmount.toFixed(2),
          message: x.message,
          date: Date.parse(x.createdOn)
        };
      });

      contributions = contributions.concat(newContributions);

      // Successful get - decrement our "semaphore"
      waitingOn = waitingOn - 1;
      dataChanged();
    }

    // Call this to refresh data from all our participants.
    var update = function() {
      $scope.errors = [];
      contributions = [];

      // This is how many callbacks we expect before we can apply.
      waitingOn = members.length;

      for (i = 0; i < members.length; i++) {
        GLOBALS.GET_PARTICIPANT_DONATION_INFO(members[i], handleParticipantDonationInfo, function(error) {
          // Failed get - decrement our "semaphore"
          waitingOn = waitingOn - 1;
          showError("Couldn't get donation info", error);
        });
      }

    }

    // Get our IDs and start the update cycle.
    getParticipantIDs(function() {
      update();
      // Get new data from the server every 'updateEvery' seconds
      setInterval( update, updateEvery*1000);
    });

  });

})();
