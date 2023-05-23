export default class Range {
  constructor(begin, end) {
    (this.low = begin), (this.hi = end);
  }
  getAll() {
    let arr = [];
    for (let i = this.low; i <= this.hi; i++) {
      arr.push(i);
    }
    return arr;
  }
}
