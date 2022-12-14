// 定义记分牌的类
class ScorePanel {
  score = 0;
  level = 1;

  scoreEle: HTMLElement;
  levelEle: HTMLElement;


  // 限制等级上限
  maxLevel: number;
  // 表示多少分升一级
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 定义一个加分的方法
  addScore() {
    this.scoreEle.innerHTML = ++this.score + '';
    // 判读分数是多少
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // 定义一个等级的方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }

}

export default ScorePanel;