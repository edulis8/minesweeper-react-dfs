import { useState, useMemo } from 'react';
import './App.css';
import { dfs, generateBoard, revealMines } from './utils';

// TODO add dropdown with other board lengths and difficulties
const BEGINNER_BOARD_LENGTH = 9;
function App() {
  const [board, setBoard] = useState(
    useMemo(
      () => generateBoard(BEGINNER_BOARD_LENGTH, BEGINNER_BOARD_LENGTH, 10),
      [],
    ),
  );

  const [gameOver, setGameOver] = useState(false);

  function checkGameWon(gameBoard) {
    for (const row of gameBoard) {
      for (const cell of row) {
        // If the cell is not a mine and is not revealed, the game is not won
        if (!cell.isMine && !cell.isRevealed) {
          return false;
        }
      }
    }
    // If all non-mine cells are revealed, the game is won
    return true;
  }

  function handleLeftClick(row, col) {
    if (gameOver) return;
    if (board[row][col].isFlagged) return;
    if (checkGameWon(board)) {
      alert('Game won :)'); // TODO improve this
      reset();
    }

    const newBoard = JSON.parse(JSON.stringify(board));
    if (board[row][col].isMine) {
      // explode and reveal all mines
      console.warn('Mine!!');
      setBoard(revealMines(board));
      setGameOver(true);
    }

    if (newBoard[row][col].adjacentMines > 0) {
      newBoard[row][col].isRevealed = true;
      setBoard(newBoard);
    }

    dfs(row, col, newBoard, new Set());
    setBoard(newBoard);
  }

  function handleRightClick(row, col) {
    if (gameOver) return;
    // Update isFlagged property and state
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  }

  function reset() {
    setGameOver(false);
    setBoard(generateBoard(BEGINNER_BOARD_LENGTH, BEGINNER_BOARD_LENGTH, 10));
  }

  return (
    <main>
      <h2>Minesweeper</h2>
      <h4>(Using a depth-first search graph algorithm to reveal the board.)</h4>
      <section className="info">
        {gameOver ? (
          <button className="reset" onClick={reset} type="button">
            Game Over, Reset?
          </button>
        ) : (
          ''
        )}
      </section>
      <section
        className="board"
        style={{
          gridTemplateColumns: `repeat(${BEGINNER_BOARD_LENGTH}, 1fr)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              rowIndex={rowIndex}
              colIndex={colIndex}
              onLeftClick={handleLeftClick}
              onRightClick={handleRightClick}
            />
          )),
        )}
      </section>
    </main>
  );
}

export default App;

function Cell({ cell, rowIndex, colIndex, onLeftClick, onRightClick }) {
  return (
    <div
      className={`cell ${cell.isRevealed ? 'revealed' : ''} ${cell.isFlagged ? 'flagged' : ''}`}
      onClick={() => onLeftClick(rowIndex, colIndex)}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(rowIndex, colIndex);
      }}
      tabIndex={0}
    >
      <CellDisplay cell={cell} />
    </div>
  );
}

function CellDisplay({ cell }) {
  if (cell.isRevealed) {
    if (cell.isMine) {
      return <span className="bomb">💣</span>;
    }
    return (
      <span className={`number-${cell.adjacentMines}`}>
        {cell.adjacentMines}
      </span>
    );
  }
  return null;
}
