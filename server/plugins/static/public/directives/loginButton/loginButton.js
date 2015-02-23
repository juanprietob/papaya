angular.module('papaya')
.directive('loginButton', ['login', function (login) {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'directives/loginButton/loginButtonTemplate.html',
    link: link,
    scope: {
      
    }
  };

  function link (scope, element, attrs) {

    scope.CLIENT_ID = "898055496476-pgg0joim1iprka2mht6sd1jhme4ock3f.apps.googleusercontent.com";
    scope.immediateFailed = true;
    scope.userName = "";

    scope.signinCallback = function(authResult) {
      if (authResult['status']['signed_in']) {
        // Update the app to reflect a signed in user
        gapi.client.load('plus','v1', function(){
         var request = gapi.client.plus.people.get({
           'userId': 'me'
         });
         request.execute(function(resp) {
          scope.userName = resp.displayName;
          scope.$apply();
         });
        });

        login.googleLogin(authResult.code)
        .then(function(res){
          console.log(res);
        });

        scope.immediateFailed = false;
        $('#loginModal').modal('hide');
        // console.log(authResult);
      } else {
        // Update the app to reflect a signed out user
        // Possible error values:
        //   "user_signed_out" - User is signed-out
        //   "access_denied" - User denied access to your app
        //   "immediate_failed" - Could not automatically log in the user
        console.log('Sign-in state: ' + authResult['error']);
      }
    }

    scope.logout = function(){
      gapi.auth.signOut();
      scope.immediateFailed = true;
    }

    gapi.signin.render('myGsignin', {
      'scope': "https://www.googleapis.com/auth/plus.login",
      'clientid': scope.CLIENT_ID,
      'redirecturi': "postmessage",
      'accesstype': "offline",
      'cookiepolicy': "single_host_origin",
      'callback': scope.signinCallback
      });

  }
}]);