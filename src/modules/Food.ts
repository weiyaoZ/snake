// 定义食物类 Food
class Food {
  element: HTMLElement;
  constructor() {
    // 加 ！是因为 element 可能为空，ts会有提示
    this.element = document.getElementById('food')!;
  }

  // 定义一个获取食物 X 轴坐标的方法
  get X() {
    return this.element.offsetLeft;
  }

  // 定义一个获取食物 Y 轴的坐标
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    // 生成一个随机的位置
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;

    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}

export default Food;