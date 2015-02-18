'use strict';

angular
  .module(
    'beoi.modules.main'
  )
  .controller(
    'LatestUVACtrl', [
      '$http', '$scope', '$log',
      function ($http, $scope, $log) {

        $scope.submit_uva_username = function() {
          var uva_username = $('#modal-uva-username').val();
          $http.get('http://uhunt.felix-halim.net/api/uname2uid/'+uva_username)
          .success(function(data){
            var userid = parseInt(data)
            if (userid > 0) {
              $http.post("/api/users/me", { 
                uva_user_id: userid
              }).
              success(function(data, status, headers, config) {
                $log.debug("/api/users/me ");
                alert("Thank you. Now refresh the page to appear in the list. (no, auto-refresh is not implemeted for now ;-)) ")
              });

            } else {
              alert("Invalid username")
            }
          })
        };


        $scope.uva_pids = [964, 2408, 1508, 2070, 3139, 3503];
        $scope.uva_problems = {}

        $http.get('/api/users-uva-ids', {})
          .success(function(data){
            var users = data;
            var uva_users_ids_csv = _.map(users, function(x){return x["uva_user_id"];}).join();
            var uva_pids_csv = $scope.uva_pids.join();
            $http.get('http://uhunt.felix-halim.net/api/subs-pids/'+uva_users_ids_csv+'/'+uva_pids_csv , {})
              .success(function(data){

                $scope.uva_results = _.map(users, function(user) {
                  var uva_user_id = user["uva_user_id"];
                  var user_submissions = data[uva_user_id]["subs"];
                  var user_successes = _.map($scope.uva_pids, function(pid){
                    return _.find(user_submissions, function(submission){
                      return submission[1] == pid && submission[2] == 90;
                    });
                  });
                  return {
                    name: user["name"],
                    uva_user_id: uva_user_id,
                    uva_problem_results: user_successes
                  }
                });
              });
          });

        _.each($scope.uva_pids, function(pid){
          $http.get('http://uhunt.felix-halim.net/api/p/id/'+pid)
            .success(function(data){
              var section = Math.floor(data.num/100);
              data.ext_problem_url1 = 'http://uva.onlinejudge.org/external/'+section+'/'+data.num+'.html';
              data.ext_problem_url2 = 'http://acm.uva.es/p/v'+section+'/'+data.num+'.html';
              data.problem_url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem='+data.pid;
              data.submit_url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=submit_problem&problemid='+data.pid+'&category=24';
              data.stats_url = 'http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=problem_stats&problemid='+data.pid+'&category=24';
              $scope.uva_problems[pid] = data;
            });
        });







        // $scope.submissions = [];
        // var maxcount = 10;

        // _.each(uva_user_ids, function(user_id){
        //   $http.get('http://uhunt.felix-halim.net/api/subs-user-last/'+user_id+'/'+maxcount, {})
        //   .success(function(data){
        //     if (data['subs'].length) {
        //       var previous = $scope.submissions;
        //       var new_values = _.map(data['subs'], function(sub){
        //         return {
        //           name: data['name'],
        //           uname: data['uname'],
        //           sub_id: sub[0],
        //           prob_id: sub[1],
        //           verdict_id: sub[2],
        //           runtime: sub[3],
        //           sub_time: sub[4]*1000,
        //           lang_id: sub[5],
        //           sub_rank: sub[6]
        //         }
        //       })
        //       previous = previous.concat(new_values);
        //       previous = _.sortBy(previous, function(sub){
        //         return -sub['sub_time'];
        //       });
        //       $scope.submissions = previous.slice(0,maxcount);
        //     };
        //   });
        // });


      }
    ]
  );

