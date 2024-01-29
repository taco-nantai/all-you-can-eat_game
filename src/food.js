export class Food {
  constructor(position) {
    this.position = { ...position };
    this.isVisible = false;
  }

  appear() {
    if (this.isVisible) return;
    this.isVisible = true;
    const foods = Object.keys(foodToScore);
    const ramdomIndex = Math.floor(Math.random() * foods.length);
    this.variety = foods[ramdomIndex];
  }

  eat() {
    if (this.isVisible) {
      this.disappear();
      return foodToScore[this.variety];
    } else {
      return 0;
    }
  }

  disappear() {
    this.isVisible = false;
  }

  get emoji() {
    return this.isVisible ? this.variety : "  ";
  }
}

const foodToScore = {
  "🍔": 30,
  "🍖": 30,
  "🍜": 30,
  "🥧": 30,
  "🍰": 30,
  "🧇": 20,
  "🥪": 20,
  "🍗": 20,
  "🍛": 20,
  "🍣": 20,
  "🥘": 20,
  "🍝": 20,
  "🌮": 20,
  "🍨": 20,
  "🥞": 20,
  "🍟": 10,
  "🌭": 10,
  "🍩": 10,
  "🍪": 10,
  "🍭": 10,
  "🍮": 10,
  "🥐": 10,
  "🥨": 10,
  "🧀": 10,
  "🥗": 10,
  "🍠": 10,
  "🍙": 10,
  "🧁": 10,
  "🍦": 10,
  "🍫": 10,
};
