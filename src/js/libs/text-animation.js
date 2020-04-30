import { TweenMax, Back } from "gsap";
export class TextAnimation {
  constructor(el) {
    this.DOM = {};
    this.DOM.el = el instanceof HTMLElement ? el : document.querySelector(el);
    console.log(`textAnimation:${this.DOM.el.innerHTML}`);
    this.chars = this.DOM.el.innerHTML.trim().split("");
    console.log(this.chars);
    this.DOM.el.innerHTML = this._splitText();
    console.log(this.DOM.el.innerHTML);
  }
  _splitText() {
    return this.chars.reduce((acc, curr) => {
      curr = curr.replace(/\s+/, "&nbsp;");
      return `${acc}<span class="char">${curr}</span>`;
    }, "");
  }
  animate() {
    this.DOM.el.classList.toggle("inview");
  }
}
export class TweenTextAnimation extends TextAnimation {
  constructor(el) {
    super(el);
    this.DOM.chars = this.DOM.el.querySelectorAll(".char");
  }

  animate() {
    this.DOM.el.classList.add("inview");
    this.DOM.chars.forEach((c, i) => {
      TweenMax.to(c, 0.6, {
        ease: Back.easeOut,
        delay: i * 0.3,
        startAt: { y: "-50%", opacity: 0 },
        y: "0%",
        opacity: 1
      });
    });
  }
}
