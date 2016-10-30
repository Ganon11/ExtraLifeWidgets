(function() {
  var app = angular.module( 'progress', [] );

  app.controller( 'progressCtrl', function( $scope, $http ) { 
  
    var urlVars = GLOBALS.getUrlVars();
    var uid = urlVars['id'];
    var isTeam = urlVars['team'];
    if (isTeam === 'false' || Number(isTeam) === 0) { isTeam = false; }
    var gotGoal = gotTotal = false;

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

    var tryToDoPercent = function(){
      //only do this if both parts exist
      if (!gotGoal || !gotTotal) { return; }
      
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
      //hacky text measurement - add 60 for 'total: $' and 5 for margin
      //TODO - add fn to actually measure text
      //note: this is a bit sneaky. I'm keeping the text in a div with the same
      //width as the colored bar, and lining it up with the right edge.
      //BUT here we set the min-width to the text width so it'll never go off the edge.s
      var textWidth = 65 + 13 * $scope.curTotal.toString().length;
      $scope.totalContStyle =  {
        width: $scope.pct+"%",
        minWidth: textWidth+"px"
      };
      
      $scope.showNumbers = true;
    };
    
    var setUpGoalText = function(){
      //gotta use calc so it'll line up when the curTotal reaches the goal
      //add 54 for 'goal: $'
      var textWidth = 50 + 15 * $scope.goal.toString().length;
      $scope.goalStyle = { left: "calc(100% - "+textWidth+"px)" };
    };
    
    var saveTeamInfo = function(info) {
      $scope.name = info.displayName.toUpperCase();
      $scope.goal = info.fundraisingGoal;
      $scope.curTotal = info.totalRaisedAmount;
      gotGoal = gotTotal = true;
      
      setUpGoalText();      
      
      tryToDoPercent();
      //trigger a digest cycle; we're not in one now due to ajax
      $scope.$apply();
    };

    var saveUserInfo = function(info) {
      $scope.name = info.displayName.toUpperCase();
      $scope.goal = info.fundraisingGoal;
      gotGoal = true;

      setUpGoalText();
      
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
      gotTotal = true;
      
      tryToDoPercent();
      //trigger a digest cycle; we're not in one now due to ajax
      $scope.$apply();
    };
    
    //TODO - better error handling. probably a uniform error page btw all widgets
    var error = function(){
      console.log('Bad ID in URL');
    };
    
    var update = function(){
      //leaving this in for now - handy for debugging, esp css stuff
      //uid = String(Number(uid) + 1);
      gotGoal = gotTotal = false;
      if (isTeam){
        GLOBALS.GET_TEAM_INFO(uid, saveTeamInfo, error);
      } else {
        GLOBALS.GET_PARTICIPANT_INFO(uid, saveUserInfo, error);
        GLOBALS.GET_PARTICIPANT_DONATION_INFO(uid, saveDonationInfo, error);
      }
    };
    
    update();
    window.setInterval(update, 1000);

  });

})();