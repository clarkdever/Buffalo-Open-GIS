angular.module('firebase.config', [])
  .constant('FBURL', 'https://intense-heat-5787.firebaseio.com')
  .constant('MBAccessToken', 'pk.eyJ1IjoiZ2lhbmFkZGEiLCJhIjoiRzRHV05uTSJ9.7BDOS7nCZCVrXSfemvzaFQ')

  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','anonymous','facebook','twitter','github'])

  .constant('loginRedirectPath', '/login');