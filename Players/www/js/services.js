angular.module('starter.services', [])

.factory('Players', function ($http, Settings) {

      var that = {};

      var players = [];

      that.all = function (callback) {
          $http.get(Settings.serverValue() + 'players').success(function (data) {
            players = data;
            callback(players);
          }).error(function (data) {
            alert('Unable to connect to server ' + Settings.serverName() + '.  Response from server was: ' + data);
          });
      };

      that.get = function (id) {
        var result = null;
        players.forEach(function (player) {
          if (player.userid === parseInt(id, 10)) {
            result = player;
          }
        });
        return result;
      };

      that.add = function (data) {
          if(data.userid) {
              // do a put
              var newPlayer = [];
              newPlayer.push(data);
              $http.put(Settings.serverValue() + 'players/' + data.userid, newPlayer).success(function (data) {

              }).error(function (data) {
                  alert('Unable to connect to server ' + Settings.serverName() + '.  Response from server was: ' + data);
              });
          } else {
              // do a post
              var newPlayer = [];
              newPlayer.push(data);
              $http.post(Settings.serverValue() + 'players', newPlayer).success(function (data) {

              }).error(function (data) {
                  alert('Unable to connect to server ' + Settings.serverName() + '.  Response from server was: ' + data);
              });
          }

      };

      that.delete = function (id) {
        $http.delete(Settings.serverValue() + 'players/' + id).success(function (data) {

        }).error(function (data) {
          alert('Unable to connect to server ' + Settings.serverName() + '.  Response from server was: ' + data);
        });
      };

      that.new = function () {
        return {
          userid: null,
          name: null,
          comments: null,
          email: null,
          salary: null,
          signdate: null
        }
      };

      return that;

})

.factory('Settings', function () {
      var that = {};

      var servers = [
        { name: "OfficeSandpoint", value: "http://10.10.50.252:7789/api/", isSelected: true},
        { name: "Digial Ocean", value: "http://104.131.69.243:7777/api/", isSelected: false},
        { name: "RaspberryPi", value: "http://10.10.50.46:7777/api/", isSelected: false}
      ];

      var selectedServer = 0;

      that.serverName = function () {
        return servers[selectedServer].name;
      };

      that.serverValue = function () {
        return servers[selectedServer].value;
      };

      that.setServer = function (name) {
        servers.forEach(function (server, index) {
            server.isSelected = false;
            if (server.name === name) {
                selectedServer = index;
                server.isSelected = true;
            }
        });
      };

      that.serverList = function () {
        return servers;
      };

      return that;
    });
