var myApp = angular.module('myApp', []);

myApp.controller('TasksController', function(TasksService) {
  var vm = this;

  vm.getTasks = function() {
    console.log('in controller');
    TasksService.getTasks().then(function() {
      vm.tasks = TasksService.data;
      console.log('back in controller with:', vm.tasks);
    });
  }; // end getTasks

  vm.addTask = function() {
    var taskToSend = {
      task: vm.enterTask
    };
    console.log(taskToSend);

    vm.task = '';
    TasksService.addTask(taskToSend).then(function(data) {
      console.log(data);
      vm.getTasks();
    });
  };

  vm.init = function() {
    vm.getTasks();
  };

  vm.deleteTask = function(taskId) {
    console.log('task to delete:');
    TasksService.deleteTask(taskId).then(function() {
      console.log('back in controller', TasksService.deletedTask);
      vm.delete = TasksService.deletedTask;
      vm.getTasks();
    });
  };


  vm.updateTask = function(){
    console.log('update task');

  };
});
