(function(){

    angular.module('noteriousApp')
        .controller('BoardsCtrl', [ 'BoardsService', '$scope','$log', BoardsCtrl ]);

    function BoardsCtrl (BoardsService, $scope, $log ) {
        var vm = this;

        $log.debug('Runs BoardsCtrl');

        //$scope.file.then(function(text){
        //   $log.debug('File loaded ' + text);
        //});


        vm.boards = BoardsService.getBoards();
        console.log(vm.boards);

        vm.remove = function remove(board) {
            BoardsService.remove(board);
            vm.boards = BoardsService.getBoards();
        }



        //old function no in CreateBoardController
        //vm.addBoard = function() {
        //
        //    var currentBoards = BoardsService.getBoards();
        //    console.log(currentBoards);
        //
        //    var newId = Object.keys(BoardsService.getBoards()).length;
        //    var newBoard = {};
        //    newBoard[newId] = {
        //        title: $scope.title,
        //        description: $scope.description,
        //        isPublic: $scope.isPublic,
        //        notes: [],
        //        id: newId
        //    };
        //
        //    console.log(newBoard);
        //    BoardsService.addBoard(newBoard);
        //};
    }
})();