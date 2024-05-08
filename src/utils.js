export function generateBoard(rows, cols, mines) {
  console.log('*generating the board*');
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    })),
  );

  // place mines in random spots
  for (let i = 0; i < mines; i++) {
    let [row, col] = genRandomLocation(rows, cols);

    while (board[row][col].isMine) {
      [row, col] = genRandomLocation(rows, cols);
    }
    board[row][col].isMine = true;
  }

  // figure out adjacent mines number - if cell is not a mine, count mines that are up/down/left/right,
  // traverse board
    // adjecentMines++ on current cell checking all 8 neighbors. 3 loops here.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const neighbors = getNeighbors(row, col, board);
      for (const [nRow, nCol] of neighbors) {
        if (board[nRow][nCol].isMine) {
          // NOTE - even mines will have adjacentMines...
          board[row][col].adjacentMines += 1;
        }
      }
    }
  }

  return board;

  function genRandomLocation(rows, cols) {
    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);
    return [randomRow, randomCol];
  }
}

// get neighbors with diagonals by using offsets between -1 and 1, ignoring 0,0 which is current cell
export function getNeighbors(row, col, board) {
  const numRows = board.length;
  const numCols = board[0].length;

  const result = [];
  // iterate from -1,0,1
  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
      if (rowOffset === 0 && colOffset === 0) continue; // skip this cell
      const neighborRow = row + rowOffset; // add row to offset
      const neighborCol = col + colOffset; // add col to offset
      // check if valid spot
      const isWithinBounds =
        neighborRow >= 0 &&
        neighborRow < numRows &&
        neighborCol >= 0 &&
        neighborCol < numCols;
      // if valid, push
      if (isWithinBounds) {
        result.push([neighborRow, neighborCol]);
      }
    }
  }
  return result;
}

export function revealMines(newBoard) {
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[0].length; col++) {
      if (newBoard[row][col].isMine) {
        newBoard[row][col].isRevealed = true; // traverse board, set isRevealed to TRUE if a mine
      }
    }
  }
  return newBoard;
}

export function dfs(row, col, board, visited) {
  // set reveled to true
  // set visited set with coords
  // get neighbors
  // any neighbors with numbers, reveal, don't recurse
  // any neighbors with mines, don't reveal, don't recurse
  board[row][col].isRevealed = true; // reveal empties and numbers
  visited.add(`${row}-${col}`);

  // stop recursion on numbers
  if (board[row][col].adjacentMines > 0) {
    return;
  }

  for (const [nRow, nCol] of getNeighbors(row, col, board)) {
    if (
      // IMPORTANT: check if neighbors have been visited !
      !visited.has(`${nRow}-${nCol}`) &&
      board[nRow][nCol].isMine === false
    ) {
      dfs(nRow, nCol, board, visited);
    }
  }
}
