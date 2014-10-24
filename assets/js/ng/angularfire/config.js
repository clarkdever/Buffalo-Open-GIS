angular.module('firebase.config', [])
  .constant('FBURL', 'https://intense-heat-5787.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','anonymous','facebook','twitter','github'])

  .constant('loginRedirectPath', '/login');