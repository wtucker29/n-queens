/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findSolution = function(row, n, board, validator, callback) {
  if (row === n) {
    return callback();
  }

  for (var i = 0; i < n; i++) {
    board.togglePiece(row, i);
    if (!board[validator]()) {
      var result = findSolution(row + 1, n, board, validator, callback);
      if (result) {
        return result;
      }
    }
    board.togglePiece(row, i);
  }
};

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});

  var solution = findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  });
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

  // var inner = function(row) {
  //   //base case (if the row we are at is equal to n)
  //   if (row === n) {
  //     var solution = board.rows();
  //     console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  //     return solution;
  //   }

  //   for (var col = 0; col < n; col++) {
  //     board.togglePiece(row, col); //place a piece on the board
  //     if (!board.hasAnyRooksConflicts()) {
  //       var result = inner(row + 1); //
  //       if (result) {
  //         return result;
  //       }
  //     }
  //     board.togglePiece(row, col);
  //   }
  // };

  // return inner(0);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  //var uniqueSolutions = new Set();
  var board = new Board({n: n});

  findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    solutionCount++;
  });

  // var inner = function(row) {
  //   if (row === n) {
  //     solutionCount++;
  //     //uniqueSolutions.add(JSON.stringify(board.rows()));
  //     return;
  //   }

  //   for (var col = 0; col < n; col++) {
  //     if (!uniqueSolutions.has(col)) {
  //       uniqueSolutions.add(col);
  //       inner(row + 1);
  //       uniqueSolutions.delete(col);
  //     }

  //   }
  // };

  //inner(0);
  //var solutionCount = uniqueSolutions.size;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //var solution = undefined; //fixme

  var board = new Board({n: n});

  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  }) || board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

  // if (n === 2 || n === 3) {
  //   solution = board.rows();
  //   return solution;
  // }

  // var inner = function(row) {
  //   if (row >= n) {
  //     solution = board.rows();
  //     console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //     return solution;
  //     //return solution;
  //   }

  //   for (var col = 0; col < n; col++) {
  //     board.togglePiece(row, col);
  //     if (!board.hasAnyQueensConflicts()) {
  //       var result = inner(row + 1);
  //       if (result) {
  //         return result;
  //       }
  //     }
  //     board.togglePiece(row, col);
  //   }

  //   //return [];
  // };

  // return inner(0);
  //return solution;
  //return board.rows();

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  //var uniqueSolutions = new Set();
  var board = new Board({n: n});

  findSolution(0, n, board, 'hasAnyQueensConflicts', function() {
    solutionCount++;
  });


  // var inner = function(row) {
  //   if (row === n) {
  //     solutionCount++;
  //     return;
  //   }

  //   for (var col = 0; col < n; col++) {
  //     board.togglePiece(row, col);
  //     if (!board.hasAnyQueensConflicts()) {
  //       if (!uniqueSolutions.has(col)) {
  //         uniqueSolutions.add(col);
  //         inner(row + 1);
  //         uniqueSolutions.delete(col);
  //       }
  //     }
  //     board.togglePiece(row, col);
  //   }
  // };

  // inner(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
