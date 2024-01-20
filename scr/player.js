export class Player {
  constructor(game, position) {
    this.game = game;
    this.position = { ...position };
    this.face = { normal: "😀", fed: "😋" };
    this.isFed = false;
    this.setup();
  }

  setup() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    process.stdout.write("\x1b[?25l");
    this.listenInput();
  }

  listenInput() {
    process.stdin.on("data", (key) => {
      this.handleInput(key);
    });
  }

  handleInput(key) {
    if (key === "\u0003") {
      this.game.end();
    } else if (Object.keys(arrowToDirection).includes(key)) {
      this.move(arrowToDirection[key]);
    }
  }

  move(direction) {
    switch (direction) {
      case "up":
        if (this.position.y > 0) this.position.y -= 1;
        break;
      case "down":
        if (this.position.y < this.game.gameSize.y - 1) this.position.y += 1;
        break;
      case "right":
        if (this.position.x < this.game.gameSize.x - 1) this.position.x += 1;
        break;
      case "left":
        if (this.position.x > 0) this.position.x -= 1;
        break;
    }
    const score = this.game.foods[this.position.y][this.position.x].eat();
    this.isFed = score > 0;
    this.game.increaseScore(score);
  }

  isAtPosition(x, y) {
    return x === this.position.x && y === this.position.y;
  }

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }
}

const arrowToDirection = {
  "\u001b[A": "up",
  "\u001b[B": "down",
  "\u001b[C": "right",
  "\u001b[D": "left",
};
