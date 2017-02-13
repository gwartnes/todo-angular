angular.module('todoList', ["filters"])
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
            $scope.todos.push($scope.newTodo);
            $scope.newTodo = {};
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

        // delete a todo
        $scope.delete = function(todo){
            $scope.todos.splice($scope.todos.indexOf(todo), 1);
        }

        // external service for pretty formatting of dates
       // $scope.formatDate = formatDate;

        // return the css class pertaining to whether there are items remaining or any unarchived items
        $scope.remainingOrUnarchivedCss = function() {
            return $scope.remaining() > 0 || $scope.unarchived() == 0 ? 'disappear' : 'reappear'
        }

        // number of remaining items that aren't completed or archived
        $scope.remaining = function(){
            var count = 0;
            angular.forEach($scope.todos, function(todo){
                if (todo.completed && !todo.archived){
                    count++;
                }
            });
            return count;
        };

        // for showing/hiding archived items
        $scope.toggleArchived = function(){
            $scope.archivedShowing = !$scope.archivedShowing;
            if ($scope.archivedShowing){
                delete $scope.whatToShow.archived;
            }
            else{
                $scope.whatToShow.archived = false;
            }
        };

        // for showing/hiding completed items
        $scope.toggleCompleted = function(){
            $scope.completedShowing = !$scope.completedShowing;
            if ($scope.completedShowing){
                delete $scope.whatToShow.completed;
            }
            else{
                $scope.whatToShow.completed = false;
            }
        };

        // number of items which aren't archived (archived items also implies completed items)
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