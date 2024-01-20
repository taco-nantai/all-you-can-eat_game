#!/usr/bin/env node

import { Game } from "./scr/game.js";

function main() {
  const game = new Game();
  game.start();
}

main();
