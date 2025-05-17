"use client";
import { useState } from "react";
import ChessCoachBoard from "../components/ChessCoachBoard";
import ChessCoachChat from "../components/ChessCoachChat";
import { Chess, Move } from "chess.js";
import React from "react";

function getRandomMove(game: Chess) {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}

export default function Home() {
  const [fen, setFen] = useState(() => new Chess().fen());
  // IMPORTANT: Always include move notations (e.g., e5, Nf6) as standalone words in messages for clickable move tooltips to work.
  const [messages, setMessages] = useState([
    { role: "ai", content: "I played e5 to control the center and open lines for my pieces.", fenBeforeMove: new Chess().fen() },
    { role: "user", content: "Why not Nf6 instead?" },
    // The next AI message will have the FEN after Nf6 (once implemented)
  ]);

  // --- New state for interactive move tooltips ---
  const [selectedMoveInfo, setSelectedMoveInfo] = useState<{ san: string, fenBeforeMove: string } | null>(null); // { SAN string, FEN before the move }

  // Placeholder for future AI commentary API
  async function getAICommentary(move: Move): Promise<string> {
    // In the future, replace this with an actual API call
    const pieceNames: Record<string, string> = {
      p: "pawn",
      n: "knight",
      b: "bishop",
      r: "rook",
      q: "queen",
      k: "king",
    };
    let commentary = "";
    if (move.piece === "p") {
      commentary = `And it's ${move.san}! The ${pieceNames[move.piece]} advances, putting pressure on the board.`;
    } else {
      commentary = `A bold move: ${pieceNames[move.piece].charAt(0).toUpperCase() + pieceNames[move.piece].slice(1)} to ${move.to}. Let's see how the opponent responds!`;
    }
    if (move.flags.includes("c")) {
      commentary += ` Captures on ${move.to}!`;
    }
    if (move.san.includes("+")) {
      commentary += ` Check! The king is under threat.`;
    }
    if (move.san.includes("#")) {
      commentary += ` Checkmate! What a finish!`;
    }
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 400));
    return commentary;
  }

  async function handleMove(move: Move, game: Chess) {
    // Add commentary for the user's move
    const commentary = await getAICommentary(move);
    setMessages((msgs) => [
      ...msgs,
      { role: "ai", content: commentary, fenBeforeMove: game.fen() },
    ]);

    // Check if it's the AI's turn and play a move
    if (game.turn() === "b" && !game.isGameOver()) {
      setTimeout(async () => {
        const aiMove = getRandomMove(game);
        if (aiMove) {
          game.move(aiMove);
          setFen(game.fen());
          // Add commentary for the AI's move
          const aiCommentary = await getAICommentary(aiMove);
          setMessages((msgs) => [
            ...msgs,
            { role: "ai", content: aiCommentary, fenBeforeMove: game.fen() },
          ]);
        }
      }, 500); // Add a small delay for better user experience
    }
  }

  // --- Handler for when a move notation is clicked in chat ---
  function handleMoveClick(moveSan: string, fenBeforeMove: string) {
    console.log("Move notation clicked:", moveSan, "FEN before move:", fenBeforeMove);
    setSelectedMoveInfo({ san: moveSan, fenBeforeMove: fenBeforeMove });
  }

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden bg-background">
      {/* Left: Chessboard */}
      <div className="flex flex-1 items-center justify-center bg-muted md:border-r border-b md:border-b-0 border-border max-w-4xl w-full min-h-0">
        <div className="flex items-center justify-center w-full h-full min-h-0" style={{ maxWidth: 600, maxHeight: 600 }}>
          <ChessCoachBoard
            fen={fen}
            setFen={setFen}
            onMove={handleMove}
            selectedMoveSan={selectedMoveInfo?.san}
          />
        </div>
      </div>
      {/* Right: Chat */}
      <div className="max-w-xl w-full h-full flex flex-col bg-background min-h-0">
        <ChessCoachChat
          messages={messages}
          setMessages={setMessages}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onMoveClick={(moveSan, _anchor) => handleMoveClick(moveSan, /* Need to pass FEN from message here */ '')}
        />
      </div>
    </div>
  );
}