(function(){
    angular.module('noteriousApp')
        .controller('CreateNoteCtrl', ['BoardsService', '$routeParams', CreateNoteCtrl]);

    function CreateNoteCtrl(BoardsService, $routeParams){
        console.log('CreateNoteCtrl runs');
        var vm = this;
        vm.defaults = {
            title: '',
            content: '',
            id: 0
        };


        //vm.board = BoardsService.getByIndex($routeParams.boardId);
        //console.log('my notes so far');
        //console.log(vm.board.notes);
        vm.note = angular.copy(vm.defaults);

        //console.log(vm.notes);
        //vm.noteId = 0;

        vm.add = function add(note, noteForm) {
            console.log('RUNS');

            if (typeof note != 'undefined') {
                vm.defaults.id ++;
                //noteId++;
                //note['id'] = noteId;
                console.log(note);
                BoardsService.addNote($routeParams.boardId, note);
                _reset(noteForm);
            }
        };

        function _reset(form) {

            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            vm.note = angular.copy(vm.defaults);

        }
    }
})();