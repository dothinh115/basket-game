export class MainGame {
  static started = false;
  static blameArr = [];
  static score = 0;
  static missed = 0;
  static isLose = false;
  static interval = null;
  static missLimit = 3;

  static addBlame = (container) => {
    const blame = document.createElement("div");
    blame.classList = "w-8 h-8 bg-yellow-500 blame";
    blame.style.position = "absolute";
    blame.style.top = "0px";
    blame.style.left = `${Math.random() * (container.offsetWidth - 30)}px`; // Random position within container
    container.appendChild(blame);
    this.blameArr.push(blame);
    this.dropBlame(blame, container);
  };

  static dropBlame = (blame, container) => {
    const fallSpeed = 2;

    const drop = () => {
      const blameRect = blame.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      if (blameRect.bottom < containerRect.bottom) {
        blame.style.top = `${parseInt(blame.style.top) + fallSpeed}px`;
        requestAnimationFrame(drop);
      } else {
        this.handleBlameMiss(blame, container);
      }
    };

    requestAnimationFrame(drop);
  };

  static handleBlameMiss = (blame, container) => {
    blame.remove();
    this.blameArr = this.blameArr.filter((b) => b !== blame);
    this.missed = (this.missed || 0) + 1;
    if (this.missed >= 3) {
      this.setStart(false);
      this.isLose = true;
    }
  };

  static checkBlameInBasket = (blame) => {
    const blameRect = blame.getBoundingClientRect();
    const basketRect = document
      .querySelector("#basket")
      .getBoundingClientRect();

    return (
      blameRect.left < basketRect.right &&
      blameRect.right > basketRect.left &&
      blameRect.top < basketRect.bottom &&
      blameRect.bottom > basketRect.top
    );
  };

  static setStart = (value) => {
    this.started = value;
    if (value) {
      this.interval = setInterval(() => {
        this.addBlame(document.querySelector("#main-game"));
      }, 1000);
    } else {
      clearInterval(this.interval);
    }
  };

  static isStarted = () => this.started;

  static getBlames = () => this.blameArr;

  static clearBlames = () => {
    this.blameArr = [];
    const blames = document
      .querySelector("#main-game")
      .querySelectorAll(".blame");
    if (blames.length > 0) {
      blames.forEach((blame) => {
        blame.remove();
      });
    }
  };
}
