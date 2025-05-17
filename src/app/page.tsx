"use client";
import { useState } from "react";
import ChessCoachBoard from "../components/ChessCoachBoard";
import ChessCoachChat from "../components/ChessCoachChat";
import { Chess, Move } from "chess.js";

export default function Home() {
  const [fen, setFen] = useState(() => new Chess().fen());
  const [messages, setMessages] = useState([
    { role: "ai", content: "I played e5 to control the center and open lines for my pieces." },
    { role: "user", content: "Why not knight to f6 instead?" },
    { role: "ai", content: "Playing Nf6 is also possible, but e5 is more classical and flexible at this stage." },
  ]);

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

  async function handleMove(move: Move) {
    const commentary = await getAICommentary(move);
    setMessages((msgs) => [
      ...msgs,
      { role: "ai", content: commentary },
    ]);
  }

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden bg-background">
      {/* Left: Chessboard */}
      <div className="flex flex-1 items-center justify-center bg-muted md:border-r border-b md:border-b-0 border-border max-w-4xl w-full min-h-0">
        <div className="flex items-center justify-center w-full h-full min-h-0" style={{ maxWidth: 600, maxHeight: 600 }}>
          <ChessCoachBoard fen={fen} setFen={setFen} onMove={handleMove} />
        </div>
      </div>
      {/* Right: Chat */}
      <div className="max-w-xl w-full h-full flex flex-col bg-background min-h-0">
        <ChessCoachChat messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}