angular.module('noteriousApp', ['ngRoute'])
	.config(config);
// Не нужно указывать зависимость .config(config, ['$routeProvider'])?
function config ($routeProvider) {
	var boards = {
        templateUrl: 'partials/boards.html',
        controller: 'BoardsCtrl',
        controllerAs: 'boardsCtrl'
    },
        notes = {
            templateUrl: 'partials/notes.html',
            controller: 'NotesCtrl',
            controllerAs: 'notesCtrl'
    },
        calculator = {
            templateUrl: 'partials/calculator.html',
            controller: 'CalcCtrl'
    },
        defaults = {
            redirectTo: '/'
    };


	$routeProvider
		.when('/', boards)
		.when('/board/:boardId', notes)
        .when('/calculator', calculator)
		.otherwise(defaults);
}

angular.module('noteriousApp')
    .controller('MainCtrl', MainCtrl);

function MainCtrl($q, $timeout, $scope, $log){
    var deferred = $q.defer();

    $log.debug('Run MainCtrl');

    function loadFile(success){
        $log.debug('Load File');
        $timeout(function() {
            success('file loaded');
        }, 3000);
    }
    loadFile(function(text){
        deferred.resolve(text);
    });

    $scope.file = deferred.promise;

}

