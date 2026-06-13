# Tower of Hanoi

A polished, fully client-side implementation of the classic **Tower of Hanoi** puzzle, built with Next.js and TypeScript.

## Description

The Tower of Hanoi is a mathematical puzzle consisting of three pegs and a stack of disks of different sizes. The goal is to move the entire stack from the leftmost peg to the rightmost peg, one disk at a time, never placing a larger disk on top of a smaller one.

This version lets you choose between 3 and 8 disks, tracks your move count, and shows the optimal minimum number of moves (2ⁿ − 1) so you can challenge yourself to play perfectly.

## How to Play

1. Choose the number of disks (3–8) from the selector.
2. Click a peg to **pick up** its top disk (it lifts and highlights).
3. Click another peg to **drop** the disk there.
4. You cannot place a larger disk on top of a smaller one — illegal moves are ignored.
5. Move all disks to the **rightmost peg (Peg 3)** to win.
6. Use **Reset** to start over. Try to match the optimal move count!

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- React Hooks for state management

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

## Build

```bash
npm run build
```
