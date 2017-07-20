myApp.service('TasksService', function($http) {
  var sv = this;

  sv.retrieveTasks = function() {
    console.log('in service', retrieveTasks);
    return $http({
      method: 'GET',
      url: '/task'
    }).then(function(response) {
      console.log('in service back from server with:', response);
      sv.data = response.data;
    }); // end http
  }; // retrieveTasks

  sv.addTask = function(task) {
    console.log('task:', task);
    return $http.post('/task', task).then(function(response) {
      console.log('back from add:', response);
      return response;
    });
  };

  sv.deleteTask = function(taskId) {
    console.log('in delete service', taskId);
    return $http.delete('/task/' + taskId).then(function(response) {
      sv.deletedTask = response;
    });
  };
});
