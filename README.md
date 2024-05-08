# Minesweeper! Made with React.

Minesweeper game, leveraging a depth-first search graph algorithm to reveal the board.




## Created from: Ready-to-hack React Skeleton 💀: React + Vite (All Cleaned-Up) + Eslint and Prettier Setup

## TO CLONE IT:
- `git clone https://github.com/edulis8/react-vite-prettier-skeleton.git` [your-new-app-name-here]
- in github, create a new repo
- `git remote set-url origin [your-new-repo.git]`
- `git push`

This template provides a minimal setup to get React working in Vite.

## Steps to re-create this skellie 🩻:
- npm create vite@latest
- choose React, JavaScript
- npm install
- npm run dev

Then - grab Wes Bos's "No-Sweat™ Eslint and Prettier Setup" 
- read this for context and options: https://github.com/wesbos/eslint-config-wesbos
- "Lints JavaScript and TypeScript based on the latest standards" - Wes 'Barracuda' Bos
- run `npm install eslint-config-wesbos`
- I put this in the `.eslintrc.cjs`:

```
extends: [
    "wesbos"
],
```
- I added these rules to the `.eslintrc.cjs` to avoid some of the more annoying linter errors for the rapid-quick™ developer:
  - 'react/jsx-no-bind': 0,
  - 'react/prop-types': 0,


You may need to restart VS Code. Maybe not. If Ctrl-S doesn't trigger Prettier, restart VS Code.



