import { Food } from "./food.js";
import { Player } from "./player.js";
import { Printer } from "./printer.js";

const TIME_LIMIT = 20;
const GAME_SIZE = { x: 5, y: 5 };
const STARTING_POSITION = {
  x: Math.floor(GAME_SIZE.x / 2.0),
  y: Math.floor(GAME_SIZE.y / 2.0),
};
const FOOD_APPEARANCE_PROBABILITY = 0.3;
const TICK_CYCLE = 1000;

export class Game {
  constructor() {
    this.gameSize = { ...GAME_SIZE };
    this.foods = Array.from({ length: GAME_SIZE.y }, (_, y) =>
      Array.from({ length: GAME_SIZE.x }, (_, x) => new Food({ x, y })),
    );
    this.player = new Player(this, STARTING_POSITION);
    this.printer = new Printer(this);
    this.score = 0;
    this.remainingTime = TIME_LIMIT;
    this.gameId = null;
  }

  start() {
    this.printer.printGame(true);
    this.gameId = setInterval(this.tick.bind(this), TICK_CYCLE);
  }

  tick() {
    this.remainingTime -= 1;
    this.updateFoods();
    this.printer.printGame();
    if (this.remainingTime <= 0) {
      this.end();
    }
  }

  updateFoods() {
    this.foods.forEach((foodsRow, y) => {
      foodsRow.forEach((food, x) => {
        if (
          !this.player.isAtPosition(x, y) &&
          Math.random() < FOOD_APPEARANCE_PROBABILITY
        ) {
          food.appear();
        }
      });
    });
  }

  increaseScore(score) {
    this.score += score;
    this.printer.printGame();
  }

  end() {
    clearInterval(this.gameId);
    process.stdout.write("\x1b[?25h");
    process.exit();
  }
}
