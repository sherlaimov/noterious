(function () {
    angular.module('noteriousApp')
        .controller('CreateBoardController', CreateBoardController);

    function CreateBoardController(BoardsService, $log) {
        $log.debug('Runs CreateBoardController');
        var vm = this;
        vm.defaults = {
            title: '',
            author: '',
            description: '',
            isPublic: false,
            notes: [],
            id: 0
        };

        vm.board = angular.copy(vm.defaults);

        vm.add = function add(board, boardForm) {
            console.log(board);
            vm.defaults.id++;
            BoardsService.add(board);
            _reset(boardForm);

        };

        function _reset(form) {
            //$log.debug(form);
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            vm.board = angular.copy(vm.defaults);
        }
    }
})();