(function(){
    angular.module('noteriousApp')
        .controller('NotesCtrl', [ 'BoardsService', '$routeParams', '$log', '$location', NotesCtrl ]);

    function NotesCtrl (BoardsService, $routeParams, $log, $location) {

        var vm = this;
            vm.notes = [];
        //vm.defaults = {
        //        title: '',
        //        content: '',
        //        id: 0
        //    };


        $log.debug('NotesCtrl running');

        vm.board = BoardsService.getByIndex($routeParams.boardId);
        if ( ! vm.board) {
            $location.path( "/" );
        }

        if ( vm.board.notes.length != 0)
            vm.notes.push(vm.board.notes);
        else
            vm.notes = BoardsService.getBoardNotes($routeParams.boardId);


        vm.remove = function remove(note) {
            console.log(note);
            BoardsService.removeNote($routeParams.boardId, note);
            _reset();
        };
        function _reset(form) {
            //BoardsService.getByIndex($routeParams.boardId);
            //vm.notes = vm.board.notes;
            //console.log(note);
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            //vm.notes.push(vm.board.notes);

            //console.log(vm.notes);
            //vm.notes = angular.copy(notes);

            //console.log(vm.notes);
            //var updatedBoard = BoardsService.getByIndex($routeParams.boardId);
            //console.log(updatedBoard.notes);
        }


    }

})();