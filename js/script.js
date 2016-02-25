angular.module('boardsApp', ['ngRoute'])
	.config( ['$routeProvider', config] )
	.controller('BoardsCtrl', [ 'BoardsService', '$scope', BoardsCtrl ])
	.controller('NotesCtrl', [ 'BoardsService', '$routeParams', NotesCtrl ])
    .controller('CalcCtrl', ['$scope', '$routeParams', CalcCtrl])
	.factory('BoardsService', BoardsService);

function config ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/boards.html',
			controller: 'BoardsCtrl',
            controllerAs: 'boardCtrl'
		})
		.when('/board/:boardId', {
			templateUrl: 'partials/board.html',
			controller: 'NotesCtrl'
		})
        .when('/calculator', {
            templateUrl: 'partials/calculator.html',
            controller: 'CalcCtrl'
        })
		.otherwise({
            redirectTo: '/'
        });
}
function CalcCtrl($scope) {
    $scope.lumen_options = [375, 600, 900, 1125, 1600];
    $scope.current_lumens = 600;
    $scope.current_cost = 12;
    $scope.current_hours = 3;
    $scope.total_days = 365;

    $scope.inc_conversion = .0625;
    $scope.hal_conversion = .0450;
    $scope.cfl_conversion = .0146;
    $scope.led_conversion = .0125;

    $scope.calculate = function(){
        $scope.inc_wattage = ($scope.current_lumens * $scope.inc_conversion).toFixed(1);
        $scope.hal_wattage = ($scope.current_lumens * $scope.hal_conversion).toFixed(1);
        $scope.cfl_wattage = ($scope.current_lumens * $scope.cfl_conversion).toFixed(1);
        $scope.led_wattage = ($scope.current_lumens * $scope.led_conversion).toFixed(1);

        if($scope.current_hours > 24){ $scope.current_hours = 24;}
        var total_hours = $scope.total_days * $scope.current_hours;
        var cost = $scope.current_cost / 100;

        $scope.inc_cost = ((($scope.inc_wattage * total_hours) / 1000) * cost).toFixed(2);
        $scope.hal_cost = ((($scope.hal_wattage * total_hours) / 1000) * cost).toFixed(2);
        $scope.cfl_cost = ((($scope.cfl_wattage * total_hours) / 1000) * cost).toFixed(2);
        $scope.led_cost = ((($scope.led_wattage * total_hours) / 1000) * cost).toFixed(2);
    };

    $scope.calculate();
}
function NotesCtrl (BoardsService, $routeParams) {
	console.log($routeParams);
}
function BoardsCtrl (BoardsService, $scope) {
	this.boards = BoardsService.getBoards();

	this.remove = function remove (index) {
        BoardsService.remove(index);
	};

    this.addBoard = function() {

        var currentBoards = BoardsService.getBoards();
        console.log(currentBoards);

        var newId = Object.keys(BoardsService.getBoards()).length;
        var newBoard = {};
            newBoard[newId] = {
               title: $scope.title,
               description: $scope.description,
               isPublic: $scope.isPublic,
               notes: [],
               id: newId
           };

      console.log(newBoard);
       BoardsService.addBoard(newBoard);
    };
}
function BoardsService () {
	var boards = {
		'0': {
			title: 'Title 1',
			description: 'Nice board',
			isPublic: false,
			notes: [],
			id: 0
		},
		'1': {
			title: 'Title 2',
			description: 'Not so nice board',
			isPublic: false,
			notes: [],
			id: 1
		}
	};

	function extend (target) {
		for(var i=1; i<arguments.length; ++i) {
			var from = arguments[i];
			if(typeof from !== 'object') continue;
			for(var j in from) {
				if(from.hasOwnProperty(j)) {
					target[j] = typeof from[j]==='object'
						? extend({}, target[j], from[j])
						: from[j];
				}
			}
		}
		return target;
	}

    function _add(newBoard){

        boards = extend(boards, newBoard);
    }

	function _getBoards () {
		return boards;
	}
	function _remove (index) {
		delete boards[index];
	}

	return {
		getBoards: _getBoards,
		remove: _remove,
        addBoard: _add
	};
}