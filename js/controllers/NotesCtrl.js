(function(){
    angular.module('noteriousApp')
        .controller('NotesCtrl', [ 'BoardsService', '$routeParams', '$log', '$location', NotesCtrl ]);

    function NotesCtrl (BoardsService, $routeParams, $log, $location) {

        var vm = this;
        vm.defaults = {
                title: '',
                content: '',
                id: 0
            };
        vm.notes = [];
        $log.debug('Runs NotesCtrl with $routeParams ');

        vm.board = BoardsService.getByIndex($routeParams.boardId);

        console.log('my notes so far');
        console.log(vm.board.notes);

        if ( ! vm.board) {
            $location.path( "/" );
        }

        if ( vm.board.notes.length != 0)
            vm.notes.push(vm.board.notes);

        //console.log(vm.notes);
        vm.noteId = 0;
        vm.add = function add(note, noteForm) {
            var noteId = 0;
            if (typeof note != 'undefined') {
                noteId++;
                note['id'] = noteId;
                console.log(note);
             BoardsService.addNote($routeParams.boardId, note);
                _reset(noteForm);
            }

        };
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
            vm.notes = BoardsService.getBoardNotes($routeParams.boardId);
            //console.log(notes);
            //vm.notes = angular.copy(notes);

            //console.log(vm.notes);
            //var updatedBoard = BoardsService.getByIndex($routeParams.boardId);
            //console.log(updatedBoard.notes);
        }


    }

})();