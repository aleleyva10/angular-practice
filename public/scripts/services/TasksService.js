myApp.service('TasksService', function($http) {
  var sv = this;

  sv.getTasks = function() {
    console.log('in service');
    return $http({
      method: 'GET',
      url: '/tasks'
    }).then(function(response) {
      console.log('in service back from server with:', response);
      sv.data = response.data;
    }); // end http
  }; // retrieveTasks

  sv.addTask = function(task) {
    console.log('task:', task);
    return $http.post('/tasks', task).then(function(response) {
      console.log('back from add:', response);
      return response;
    });
  };

  sv.deleteTask = function(taskId) {
    console.log('in delete service', taskId);
    return $http.delete('/tasks/' + taskId).then(function(response) {
      sv.deletedTask = response;
    });
  };
});
