// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    /*
    [[1,0,1],
    [0,0,0],
    [0,0,0]]

    */
    hasRowConflictAt: function(rowIndex) {
      // Call .rows() function
      // Returns an array of arrays
    //   var row = this.rows()[rowIndex];
    //   var countOfOnes = 0;
    //   for (value of row) {
    //     if (value === 1) {
    //       countOfOnes += 1;
    //     }
    //   }
    //   return countOfOnes > 1 ? true : false;
    // },

      var row = this.get(rowIndex);
      var count = 0;
      for (var i = 0; i < row.length; i++) {
        count += row[i];
      }
      return count > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      /*
      create an empty array set to a variable called column
      call this.rows() to get  rows variable.
      */
      // var columnArray = [];
      // for (var array of this.rows()) {
      //   columnArray.push(array[colIndex]);
      // }
      // var countOfOnes = 0;
      // for (value of columnArray) {
      //   if (value === 1) {
      //     countOfOnes += 1;
      //   }
      // }
      // return countOfOnes > 1 ? true : false;

      var size = this.get('n');
      var count = 0;
      for (var i = 0; i < size; i++) {
        var row = this.get(i);
        count += row[colIndex];
      }
      return count > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      /*
      Iterate over columns using hasColConflictAt
      */
      var n = this.get('n');
      for (var i = 0; i < n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // 0
      // var rowList = this.rows();
      // var n = rowList.length;
      // var count = 0;

      // for (var i = 0; i < n; i++) {
      //   var row = rowList[i];
      //   if (row[majorDiagonalColumnIndexAtFirstRow + i] === 1) {
      //     count++;
      //   }
      // }
      // return (count > 1) ? true : false;
      // //return false; // fixme

      var size = this.get('n');
      var count = 0;
      var rowId = 0;
      var colId = majorDiagonalColumnIndexAtFirstRow;

      for ( ; rowId < size && colId < size; rowId++, colId++ ) {
        if (colId >= 0) {
          var row = this.get(rowId);
          count += row[colId];
        }
      }
      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // var size = this.get('n');
      // for (var i = 0; i < size; i++) {
      //   var columnIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(i, 0);
      //   if (this.hasMajorDiagonalConflictAt(columnIndex) || this.hasMajorDiagonalConflictAt(-columnIndex)) {
      //     return true;
      //   }
      // }
      // return false; // fixme

      var size = this.get('n');
      for (var i = 1 - size; i < size; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // var rowList = this.rows();
      // var n = rowList.length;
      // var count = 0;
      // for (var i = 0; i < n; i++) {
      //   var row = rowList[i];
      //   if (row[minorDiagonalColumnIndexAtFirstRow - i] === 1) {
      //     count++;
      //   }
      // }

      // return count > 1 ? true : false; // fixme

      var size = this.get('n');
      var count = 0;
      var rowId = 0;
      var colId = minorDiagonalColumnIndexAtFirstRow;

      for ( ; rowId < size && colId >= 0; rowId++, colId-- ) {
        if (colId < size) {
          var row = this.get(rowId);
          count += row[colId];
        }
      }
      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      //Create a variable called rowList = to rows of the Board
      //get n, which is the size of the board.
      //iterate over rowList
      //create colIndex = getFirstRowColIndexForMinorDiagnal(i,0)
      //if(check hasMinorDiagonalConflictAt(pos) || heck hasMinorDiagonalConflictAt(neg)){
      //return true
      //}

      // var rowList = this.rows();
      // var n = rowList.length;
      // for (var i = 0; i < n; i++) {
      //   var colIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(i, n - 1);
      //   if (this.hasMinorDiagonalConflictAt(colIndex) || this.hasMinorDiagonalConflictAt(-colIndex)) {
      //     return true;
      //   }
      // }

      // return false;

      var size = this.get('n');
      for (var i = (size * 2) - 1; i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
