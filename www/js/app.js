//Ionic Starter App

//angular.module is a global place for creating, registering and retrieving Angular modules
//'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
//the 2nd parameter is an array of 'requires'
//'starter.services' is found in services.js
//'starter.controllers' is found in controllers.js
angular.module('starter',
		[ 'ionic', 'starter.controllers', 'starter.services' ])

//.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
//  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
// 
//    if ('data' in next && 'authorizedRoles' in next.data) {
//      var authorizedRoles = next.data.authorizedRoles;
//      if (!AuthService.isAuthorized(authorizedRoles)) {
//        event.preventDefault();
//        $state.go($state.current, {}, {reload: true});
//        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
//      }
//    }
// 
//    if (!AuthService.isAuthenticated()) {
//      if (next.name !== 'login') {
//        event.preventDefault();
//        $state.go('login');
//      }
//    }
//  });
//})

.config(function($stateProvider, $urlRouterProvider, USER_ROLES) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive

	.state('login', {
		url : '/login',
		templateUrl : 'templates/login.html',
		controller : 'LoginCtrl'
	})

	.state('main', {
		url : '/',
		abstract : true,
		templateUrl : 'templates/main.html'
	})

	.state('main.dash', {
		url : 'main/dash',
		views : {
			'dash-tab' : {
				templateUrl : 'templates/dashboard.html',
				controller : 'DashCtrl'
			}
		}
	})

	.state('main.admin', {
		url : 'main/admin',
		views : {
			'admin-tab' : {
				templateUrl : 'templates/admin.html'
			}
		},
		data : {
			authorizedRoles : [ USER_ROLES.admin ]
		}
	})

	.state('main.public', {
		url : 'main/public',
		views : {
			'public-tab' : {
				templateUrl : 'templates/public.html'
			}
		}
	})

	.state('tab', {
		url : '/tab',
		abstract : true,
		templateUrl : 'templates/tabs.html'
	})

	// Each tab has its own nav history stack:

	.state('tab.dash', {
		url : '/dash',
		views : {
			'tab-dash' : {
				templateUrl : 'templates/tab-dash.html',
				controller : 'DashCtrl'
			}
		}
	})

	.state('tab.chats', {
		url : '/chats',
		views : {
			'tab-chats' : {
				templateUrl : 'templates/tab-chats.html',
				controller : 'ChatsCtrl'
			}
		}
	}).state('tab.chat-detail', {
		url : '/chats/:chatId',
		views : {
			'tab-chats' : {
				templateUrl : 'templates/chat-detail.html',
				controller : 'ChatDetailCtrl'
			}
		}
	})

	.state('tab.account', {
		url : '/account',
		views : {
			'tab-account' : {
				templateUrl : 'templates/tab-account.html',
				controller : 'AccountCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise(function($injector, $location) {
		var $state = $injector.get("$state");
		$state.go("main.dash");
	});

});
