(function() {
  var app = angular.module( 'progress', [] );

  app.controller( 'progressCtrl', function( $scope, $http ) { 
  
    var urlVars = GLOBALS.getUrlVars();
    var uid = urlVars['id'];

    //borrowed from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
    var hslToRgb = function(h, s, l){
      var r, g, b;
      if(s == 0){
          r = g = b = l; // achromatic
      }else{
          var hue2rgb = function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    //TODO - to be really angulary, this stuff should all be in a factory
    //to be used by both the participant and team versions
    var getColorPercent = function(pct){
      //HSL values of blue and green colors
      var S = 1;
      var L = 0.45;
      var start = (191/356);
      var end = (79/356);
      
      //pick a color % of the way along
      var H = start - (start - end)*pct;
      
      //convert to rgb
      var rgb = hslToRgb(H,S,L);
      
      return "rgba("+rgb[0]+","+rgb[1]+","+rgb[2]+",1)";
      
    };

    //TODO - probably hide the goal/total divs until this loads
    var tryToDoPercent = function(){
      //only do this if both parts exist
      if ($scope.goal===undefined || $scope.curTotal===undefined) { return; }
      
      var percent = $scope.curTotal / $scope.goal;
      if ( percent >= 1 ) {
        percent = 1;
        $scope.goalAchieved = true;
      }
      $scope.pct = Math.round(percent * 100);
      
      var color = getColorPercent(percent);
      $scope.thermStyle = { 
        width: $scope.pct+"%",
        "background-color": color
      };
      //hacky text measurement - add 60 for 'total: $'
      //TODO - add fn to actually measure text
      var textWidth = 60 + 13 * $scope.curTotal.toString().length;
      if ($scope.pct < 14) {
        //hardcoded - past this point it goes off the edge of the thermometer
        //TODO - this won't really work. :( figure out a better way
        $scope.totalStyle = { left: "0px" };
      } else { 
        $scope.totalStyle = { left: "calc("+$scope.pct+"% - "+textWidth+"px)" };
      }
    }

    var saveUserInfo = function(info) {
      $scope.name = info.firstName.toUpperCase();
      $scope.goal = info.fundraisingGoal;
      //gotta use calc so it'll line up when the curTotal reaches the goal
      //add 54 for 'goal: $'
      var textWidth = 50 + 15 * $scope.goal.toString().length;
      $scope.goalStyle = { left: "calc(100% - "+textWidth+"px)" };
      tryToDoPercent();
      //trigger a digest cycle; we're not in one now due to ajax
      $scope.$apply();
    };
    
    var saveDonationInfo = function(info) {
      var sum = 0;
      for (var i = 0; i < info.length; i++){
        sum = sum + info[i].donationAmount;
      }
      $scope.curTotal = sum;
      tryToDoPercent();
      //trigger a digest cycle; we're not in one now due to ajax
      $scope.$apply();
    };
    
    //TODO - better error handling. probably a uniform error page btw all widgets
    var error = function(){
      console.log('Bad user ID in URL');
    };
    
    var update = function(){
      $scope.sum = $scope.curTotal = $scope.pct = undefined;
      GLOBALS.GET_PARTICIPANT_INFO(uid, saveUserInfo, error);
      GLOBALS.GET_PARTICIPANT_DONATION_INFO(uid, saveDonationInfo, error);
    };
    
    //TODO - timeout
    update();

  });

})();