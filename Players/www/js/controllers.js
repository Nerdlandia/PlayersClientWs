angular.module('starter.controllers', [])

.controller('PlayersCtrl', function ($scope, Players) {


      var update = function (data) {
        $scope.players = data;
      };

      $scope.$on('$ionicView.enter', function(e) {
        $scope.players = [];
        $scope.players = Players.all(update);
      });

      $scope.remove = function (id) {
        Players.delete(id);
        $scope.players = Players.all(update);
      };

    })

.controller('PlayerDetailCtrl', function ($scope, Players, $stateParams, $location) {
      $scope.isEditing = false;
      $scope.player = {};

      $scope.$on('$ionicView.enter', function(e) {
        $scope.player = Players.get($stateParams.playerId);
      });

      $scope.add = function () {
        Players.add($scope.player);
        $scope.isEditing = false;
        $location.path('players');
      };

      $scope.new = function () {
        $scope.player = Players.new();
        $scope.isEditing = true;
      };

      $scope.remove = function () {
        Players.delete($scope.player.userid);
        $location.path('players');
        $scope.isEditing = false;
      };

})

.controller('SettingsCtrl', function($scope, Settings) {

  $scope.serverList = [];
  $scope.selectedName = Settings.serverName();

  $scope.$on('$ionicView.enter', function(e) {
    $scope.serverList = Settings.serverList();
  });

  $scope.updateServer = function (name) {
    Settings.setServer(name);
    $scope.selectedName = Settings.serverName();
  };

});
