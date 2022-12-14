import Food from "./Food";
import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import Control from "./Control";

// 游戏控制器，控制其他类

class GameControl {
  // 定义三个属性
  food: Food;
  snake: Snake;
  control: Control;
  scorePanel: ScorePanel;

  // 创建一个属性来存储蛇的移动方向
  direction: string = 'ArrowRight';
  // 创建一个属性保存加速
  snakeSpeed: string = ''
  // 创建一个属性用来记录游戏是否结束
  isLive = true;
  // 创建一个属性来接受延时调用对象
  timer : any;
  speed: number = 300

  constructor(speed: number = 300) {
    this.food = new Food();
    this.snake = new Snake();
    this.control = new Control();
    // 可传入两个参数（等级上限，每升级一级所需的分数）
    this.scorePanel = new ScorePanel(10, 1);
    this.speed = speed

    this.init();
  }

  // 游戏初始化方法，调用后游戏开始
  init() {
    // 绑定键盘事件
    // 该事件是给 document 对象绑定，所以回调的 this 受影响也变为 document，使用 bind 函数将 this 重新指向 GameControl 类
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    document.addEventListener('keyup', this.keyupHandler.bind(this));
    // 绑定一个重新开始的回调
    this.control.againEle.addEventListener('click', this.againGame.bind(this));
    // 绑定暂停游戏的回调
    this.control.pauseEle.onclick = this.pauseGame.bind(this);
    // 绑定继续游戏的回调
    this.control.continueEle.onclick = this.continueGame.bind(this);
    // 调用 run 方法，使蛇移动
    this.run();
  }

  // 创建一个键盘按下的相应函数
  keydownHandler(event: KeyboardEvent) {
    // 需要检查 event.key 的值是否合法
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      this.direction = event.key;
    } else if (event.key === 'Control') {
      this.snakeSpeed = event.key
    }
  }

  // 创建一个键盘松开事件
  keyupHandler(event: KeyboardEvent) {
    if(event.key === 'Control') {
      this.snakeSpeed = ''
    }
  } 

  // 创建一个控制蛇移动的方法
  run() {
    // 获取蛇现在坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    this.snakeSpeed === 'Control' ? this.speed = 200 : this.speed = 300

    // 根据方向来修改 X 和 Y 的值
    switch (this.direction) {
      case "ArrowUp":
        // 向上移动 top 减少
        Y -= 10
        break;

      case "ArrowDown":
        Y += 10
        break;

      case "ArrowLeft":
        X -= 10
        break;

      case "ArrowRight":
        X += 10
        break;
    }

    // 检查是否吃到了食物
    this.checkEat(X, Y);

    // 修改蛇的位置
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      alert(e.message);
      this.isLive = false;
    }

    // 开启一个延时调用
    this.isLive && (this.timer = setTimeout(this.run.bind(this), this.speed - (this.scorePanel.level - 1) * 20));
  }

  // 检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
  }

  // 定义一个重新开始的方法
  againGame() {
    location.reload();
  }

  // 暂停游戏
  pauseGame() {
    this.control.showContinue()
    clearTimeout(this.timer);
  }

  // 继续游戏
  continueGame() {
    this.control.showPause()
    this.timer = setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }
}

export default GameControl;