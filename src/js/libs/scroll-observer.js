export class ScrollObserver {
  constructor(elements, cb, options) {
    this.elements = document.querySelectorAll(elements);
    const defaultOptions = {
      root: null,
      // rootMargin: "-300px 0px",
      threshold: [0],
      once: true
    };
    this.options = { ...defaultOptions, ...options };
    this.cb = cb;
    this.once = this.options.once;
    this._init();
  }
  _init() {
    const callback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log(entry.target);
          this.cb(entry.target, true);
          if (this.once) {
            observer.unobserve(entry.target);
          }
        } else {
          this.cb(entry.target, false);
        }
      });
    };
    this.io = new IntersectionObserver(callback.bind(this), this.options);
    this.elements.forEach(element => this.io.observe(element));
  }
  destroy() {
    this.io.disconnect();
  }
}
