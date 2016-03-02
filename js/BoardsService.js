(function(){
    angular.module('noteriousApp')
        .factory('BoardsService', BoardsService);

    function BoardsService ($log) {
        var boards = [],
            boardsService = {};

        boardsService.add = function add (board) {
            //board.id ++;
            boards.push(board);

        };
        boardsService.remove = function remove (board) {
            boards = boards.reduce( function(result, item) {
                if(item != board) {
                    result.push(item);
                }
                return result;
            }, []);
        };
        boardsService.getBoards = function getBoards () {
            return boards;
        };

        boardsService.getByIndex = function getByIndex (index) {
            return boards[index];
        };

        boardsService.getBoardNotes = function getBoardNotes(index){
            return boards[index].notes;
        };

        boardsService.addNote = function addNote (index, note) {
            return boards[index].notes.push(note);
        };
        boardsService.removeNote = function removeNote (index, note) {
            boards[index].notes = boards[index].notes.reduce( function(result, item) {
                if(item != note) {
                    result.push(item);
                }
                return result;
            }, []);
        };

        return boardsService;
    }
})();