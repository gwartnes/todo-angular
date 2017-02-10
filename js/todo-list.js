angular.module('todoList', [])
    .controller('TodoController', ["$scope", function TodoController($scope){
        // initialize objects
        $scope.todos = [];
        $scope.newTodo = {};

        // filter variables
        $scope.archivedShowing = false;
        $scope.completedShowing = true;
        $scope.whatToShow = {archived : false};
        
        // add a new todo to the array
        $scope.add = function(){
            if (!$scope.newTodo.text) {
                return;
            }
            $scope.newTodo.completed = false;
            $scope.newTodo.archived = false;
            console.log($scope.newTodo);
            $scope.todos.push($scope.newTodo);
            $scope.newTodo = {};
            console.log($scope.todos);
        };

        // archive all completed todos (just a flag on the todo object)
        $scope.archive = function(){
            angular.forEach($scope.todos, function(todo){
                todo.archived = todo.completed;
            });
        };

        // mark a todo as completed
        $scope.complete = function(todo){
            todo.completed = !todo.completed;
            if (todo.completed) {
                todo.dateCompleted = new Date();
            }
            else {
                delete todo.dateCompleted;
            }
        };

        $scope.delete = function(todo){
            $scope.todos.splice($scope.todos.indexOf(todo), 1);
        }

        $scope.dateCompletedPretty = function(todo){
            var date = todo.dateCompleted;
            return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        }

        $scope.remaining = function(){
            var count = 0;
            angular.forEach($scope.todos, function(todo){
                if (todo.completed && !todo.archived){
                    count++;
                }
            });
            return count;
        };

        $scope.toggleArchived = function(){
            $scope.archivedShowing = !$scope.archivedShowing;
            if ($scope.archivedShowing){
                delete $scope.whatToShow.archived;
            }
            else{
                $scope.whatToShow.archived = false;
            }
        };

        $scope.toggleCompleted = function(){
            $scope.completedShowing = !$scope.completedShowing;
            if ($scope.completedShowing){
                delete $scope.whatToShow.completed;
            }
            else{
                $scope.whatToShow.completed = false;
            }
        };

        $scope.unarchived = function(){
            var count = 0;
            angular.forEach($scope.todos, function(todo){
                if (!todo.archived){
                    count++;
                }
            })
            return count;
        }

    }]);