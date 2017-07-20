var myApp = angular.module('myApp', []);
myApp.config(function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'modules/routes/tasks.js'
  });
});
myApp.controller('TasksController', function(TasksService) {
  var vm = this;

  vm.getTasks = function() {
    console.log('in controller', getTasks);
    TasksService.retrieveTasks().then(function() {
      vm.tasks = TasksService.data;
      console.log('back in controller with:', vm.tasks);
    });
  }; // end getTasks

  vm.addTask = function() {
    var taskToSend = {
      task: vm.task
    }
    vm.task = '';
    TasksService.addTask(taskToSend).then(function(res) {
      console.log(res);
      vm.getTasks();
    });
  };

  vm.init = function() {
    vm.getTasks();
  };

  vm.deleteTask = function() {
    console.log('task to delete:');
    TasksService.deleteTask().then(function() {
      console.log('back in controller', TasksService.deletedTask);
      vm.delete = TasksService.deletedTask;
      vm.getTasks();
    });
  };
});
