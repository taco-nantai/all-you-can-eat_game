import * as readline from "readline";

const SCORE_PADDING = 10;
const TIME_PADDING = 10;

export class Printer {
  constructor(game) {
    this.game = game;
    this.printingSize = this.game.gameSize.y * 2 + 3;
  }

  printGame(isFirstTime = false) {
    if (!isFirstTime)
      readline.moveCursor(process.stdout, 0, -this.printingSize);
    this.printGameStatus(isFirstTime);
    this.printScore();
    this.printGrid();
  }

  printGameStatus(isFirstTime) {
    if (isFirstTime) {
      process.stdout.write("ready?\n");
    } else if (this.game.remainingTime === 0) {
      process.stdout.write("game Over\n");
    } else {
      process.stdout.write(
        `time: ${String(this.game.remainingTime).padEnd(TIME_PADDING)}\n`,
      );
    }
  }

  printScore() {
    process.stdout.write(
      `score: ${String(this.game.score).padEnd(SCORE_PADDING)}\n`,
    );
  }

  printGrid() {
    const outerRow = `+${"-".repeat(this.game.gameSize.x * 3 - 1)}+`;
    const innerRow = `|--${"+--".repeat(this.game.gameSize.x - 1)}|`;
    process.stdout.write(`${outerRow}\n`);
    this.game.foods.forEach((foodsRow, y) => {
      process.stdout.write("|");
      foodsRow.forEach((food, x) => {
        let output;
        if (this.game.player.isAtPosition(x, y)) {
          const playerFace = this.game.player.face;
          output = this.game.player.isFed ? playerFace.fed : playerFace.normal;
        } else {
          output = food.emoji;
        }
        process.stdout.write(`${output}|`);
      });
      if (y < this.game.gameSize.y - 1) process.stdout.write(`\n${innerRow}\n`);
    });
    process.stdout.write(`\n${outerRow}\n`);
  }
}
