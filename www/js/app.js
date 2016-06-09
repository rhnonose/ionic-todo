// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('TodoCtrl', function($scope, $ionicModal) {
  var localStorage = window['localStorage'];
  console.log(localStorage);
  if(!localStorage.getItem('tasks')){
    localStorage.setItem('tasks', JSON.stringify([]));
  }
  $scope.tasks = JSON.parse(localStorage.getItem("tasks"));

  $ionicModal.fromTemplateUrl('lib/new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title,
      done: false
    });
    localStorage.setItem("tasks", JSON.stringify($scope.tasks));
    $scope.taskModal.hide();
    task.title = "";
    task.done = false;
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  $scope.saveLocalStorage = function(){
    localStorage.setItem("tasks", JSON.stringify($scope.tasks));
  };
})
