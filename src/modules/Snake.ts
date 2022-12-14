class Snake {
  // 获取蛇的容器
  element: HTMLElement;
  // 表示蛇的元素
  head: HTMLElement;
  // 蛇的身体（包括蛇头）
  bodies: HTMLCollection;
  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = this.element.getElementsByTagName('div');
  }

  // 获取蛇的坐标（蛇头坐标）
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  set X(value) {
    if (this.X === value) {
      return;
    }

    if (value < 0 || value > 290) {
      throw new Error('游戏结束！');
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }
    this.moveBody()
    this.head.style.left = value + 'px';
    this.checkHeadBody();
  }

  set Y(value) {
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error('游戏结束！');
    }

    // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // 如果发生了掉头，让蛇向反方向继续移动
      if (value > this.Y) {
        // 如果新值value大于旧值Y，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
        value = this.Y - 10;
      } else {
        // 向左走
        value = this.Y + 10;
      }
    }

    this.moveBody()
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }

  // 蛇增加身体的方法
  addBody() {
    this.element.insertAdjacentHTML('beforeend', "<div></div>");
  }

  // 蛇身体移动的方法
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let oldX = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let oldY = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将这个前面的值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = oldX + 'px';
      (this.bodies[i] as HTMLElement).style.top = oldY + 'px';
    }
  }

  // 蛇头是否碰到蛇身的方法
  checkHeadBody() {
    for(let i = 1; i < this.bodies.length; i++ ) {
      let curBd = this.bodies[i] as HTMLElement;
      if(this.X === curBd.offsetLeft && this.Y === curBd.offsetTop) {
        throw new Error('碰到蛇身，游戏结束！')
      }
    }
  }
}

export default Snake;