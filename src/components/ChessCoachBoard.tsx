"use client";
import { useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move } from "chess.js";
import { toast } from "sonner";

function getRandomMove(game: Chess) {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}

export default function ChessCoachBoard({ fen, setFen, onMove }: {
  fen: string;
  setFen: (fen: string) => void;
  onMove: (move: Move) => void;
}) {
  // Play AI move after user move
  useEffect(() => {
    const game = new Chess(fen);
    if (game.turn() === "b" && !game.isGameOver()) {
      setTimeout(() => {
        const move = getRandomMove(game);
        if (move) {
          game.move(move);
          setFen(game.fen());
          onMove(move);
        }
      }, 500);
    }
  }, [fen, setFen, onMove]);

  function onPieceDrop(source: string, target: string) {
    const game = new Chess(fen);
    try {
      const move = game.move({ from: source, to: target, promotion: "q" });
      if (move) {
        setFen(game.fen());
        onMove(move);
        return true;
      }
      toast("Illegal move!", { description: `You cannot move from ${source} to ${target}.` });
      return false;
    } catch {
      toast("Illegal move!", { description: `You cannot move from ${source} to ${target}.` });
      return false;
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Chessboard
        id="chesscoach-board"
        position={fen}
        onPieceDrop={onPieceDrop}
        boardWidth={480}
        areArrowsAllowed={true}
        autoPromoteToQueen={true}
        showBoardNotation={true}
        customBoardStyle={{ boxShadow: "0 4px 32px 0 #0002", borderRadius: 12 }}
      />
    </div>
  );
} 