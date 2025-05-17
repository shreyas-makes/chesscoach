"use client";
import { useEffect, useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Move } from "chess.js";
import { toast } from "sonner";

export default function ChessCoachBoard({ fen, setFen, onMove, selectedMoveSan }: {
  fen: string;
  setFen: (fen: string) => void;
  onMove: (move: Move, game: Chess) => void;
  selectedMoveSan?: string | null;
}) {
  const [temporaryHighlightMove, setTemporaryHighlightMove] = useState<string | null>(null);

  // Highlight logic for clicked move (temporary)
  useEffect(() => {
    if (selectedMoveSan) {
      setTemporaryHighlightMove(selectedMoveSan);
      const timer = setTimeout(() => {
        setTemporaryHighlightMove(null);
      }, 2000); // Highlight for 2 seconds
      return () => clearTimeout(timer); // Clean up on unmount or selectedMoveSan change
    }
  }, [selectedMoveSan]);

  function onPieceDrop(source: string, target: string) {
    const game = new Chess(fen);
    try {
      const move = game.move({ from: source, to: target, promotion: "q" });
      if (move) {
        setFen(game.fen());
        onMove(move, game);
        return true;
      }
      toast("Illegal move!", { description: `You cannot move from ${source} to ${target}.` });
      return false;
    } catch {
      toast("Illegal move!", { description: `You cannot move from ${source} to ${target}.` });
      return false;
    }
  }

  // --- Highlight logic for clicked move ---
  const customSquareStyles = useMemo(() => {
    if (!temporaryHighlightMove) return {};
    const game = new Chess(fen);
    // Find the move in the current position
    const moves = game.moves({ verbose: true });
    const found = moves.find(m => m.san === temporaryHighlightMove);
    // If move is not found in current position, try to find it in a game instance initialized with the *previous* FEN.
    // This requires access to previous FEN, which is not currently available. For now, just return empty if not found in current FEN.
    if (!found) return {};
    return {
      [found.from]: {
        background: "radial-gradient(circle, #ffe06688 60%, transparent 70%)",
        boxShadow: "0 0 8px 2px #ffe06688"
      },
      [found.to]: {
        background: "radial-gradient(circle, #ff922b88 60%, transparent 70%)",
        boxShadow: "0 0 12px 4px #ff922b88"
      }
    };
  }, [fen, temporaryHighlightMove]);

  return (
    <div className="flex items-center justify-center w-full h-full" style={{ position: "relative" }}>
      <Chessboard
        id="chesscoach-board"
        position={fen}
        onPieceDrop={onPieceDrop}
        boardWidth={480}
        areArrowsAllowed={true}
        autoPromoteToQueen={true}
        showBoardNotation={true}
        customBoardStyle={{ boxShadow: "0 4px 32px 0 #0002", borderRadius: 12 }}
        customSquareStyles={customSquareStyles}
        animationDuration={selectedMoveSan ? 400 : 200}
      />
    </div>
  );
} 