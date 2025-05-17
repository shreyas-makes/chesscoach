# ♟️ Chess Coach – Cursor for Chess

**Learn chess through reasoning, not memorization.**

Chess Coach is an AI chess learning interface that helps you **understand the strategy behind every move** — like a live conversation with a grandmaster. Think of Cursor IDE but for chess.

Instead of just showing you the best move, Chess Coach explains:
- Why that move was chosen
- What plan it belongs to
- What would’ve happened if you played something else

## 🎯 Purpose

Most online chess tools teach by showing moves and engine scores. But these don't help learners build lasting intuition. Beginners are left asking:
> *“Why that move?”*  
> *“What did I miss?”*  
> *“Why not this instead?”*

Chess Coach changes that.

Inspired by **Cursor IDE**, Chess Coach gives you:
- A side-by-side **chessboard** and **chat window**
- Real-time move explanations after each move
- The ability to ask *why*, *why not*, or *what if* — and see strategic answers in natural language
- Clickable notation in chat — like `f6` — that triggers visual highlights and animations on the board

The goal: **Learn chess through strategic dialogue**, not rote repetition.

## 🧠 Core Features

- 🎓 Play against an AI and get reasoning after every move
- 💬 Ask questions like “Why not knight to f6?” in the chat
- 📍 Clickable move notation that shows board animations (e.g., tooltips and arrows)
- 🧱 Designed like a coding IDE — minimal, focused, responsive

## 🧰 Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + **ShadCN UI**
- **@react-chess/chessboard** for rendering the board
- **chess.js** for game state management
- **Stockfish.js** (WASM) as AI opponent
- **Claude or OpenAI GPT-4** (planned) for chat explanations
- **Framer Motion** for board tooltips and animations

## 🚀 Status

> This is an MVP in progress.  
We’re focused on:
- Connecting move context (FEN, PGN) to LLMs
- Building the chat-reasoning flow
- Making chess notation understandable and visual for beginners

## 🛣️ Vision

We believe chess is best learned by understanding plans, not memorizing lines.  
Just like coding with Cursor IDE, **Chess Coach helps you think in systems**, not syntax.

> Learn chess by talking to your game.  
> That’s the future of chess education.

## 📂 Structure (Planned)

