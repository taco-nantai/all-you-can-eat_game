#!/usr/bin/env node

import { Game } from "./src/game.js";

function main() {
  const game = new Game();
  game.start();
}

main();
