(function(){
    angular.module('noteriousApp')
        .controller('NotesCtrl', [ 'BoardsService', '$routeParams', '$log', '$location', NotesCtrl ]);

    function NotesCtrl (BoardsService, $routeParams, $log, $location) {
        $log.debug('Runs NotesCtrl with $routeParams ' + $routeParams);

        var vm = this;
        vm.defaults = {
                title: '',
                content: '',
                id: 0
            };
        vm.notes = [];

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
            if (typeof note != 'undefined') {
                note['id'] = vm.noteId ++;
                console.log(note);
             BoardsService.addNote($routeParams.boardId, note);
                _reset(noteForm);
            }

        };
        function _reset(form) {
            //BoardsService.getByIndex($routeParams.boardId);
            //vm.notes = vm.board.notes;
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            console.log(vm.board.notes);
            vm.notes = angular.copy(vm.board.notes);
        }

        vm.remove = function remove(note) {
            BoardsService.removeNote($routeParams.boardId, note);
        };
    }

})();