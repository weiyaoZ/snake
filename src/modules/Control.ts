// 定义控制游戏的类
class Control {
  againEle: HTMLElement;
  pauseEle: HTMLElement;
  continueEle: HTMLElement;

  constructor() {
    this.againEle = document.getElementById('again')!;
    this.pauseEle = document.getElementById('pause')!;
    this.continueEle = document.getElementById('continue')!;

    this.continueEle.style.display = 'none';
  }

  showPause() {
    this.continueEle.style.display = 'none';
    this.pauseEle.style.display = 'block';
  }

  showContinue() {
    this.continueEle.style.display = 'block';
    this.pauseEle.style.display = 'none';
  }
}

export default Control;