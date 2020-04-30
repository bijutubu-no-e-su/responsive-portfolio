import { HeroSlider } from "./libs/hero-slider";
import { ScrollObserver } from "./libs/scroll-observer";
import { TweenTextAnimation } from "./libs/text-animation";
import { MobileMenu } from "./libs/mobile-menu";
import pace from "pace-js";

document.addEventListener("DOMContentLoaded", function() {
  pace.start({ document: false });
  const main = new Main();
});

class Main {
  constructor() {
    this.sections = document.querySelectorAll("section");
    this._observers = [];
    this._init();
  }
  set observers(val) {
    this._observers.push(val);
  }
  get observers() {
    return this._observers;
  }
  _init() {
    new MobileMenu();
    this.hero = new HeroSlider(".swiper-container");
    setTimeout(() => {
      this.hero.stop();
    }, 15000);
    pace.on("done", this._paceDone.bind(this));
  }
  _toggleSlideAnimation(el, inview) {
    if (inview) {
      console.log("now inview");
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }
  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add("inview");
    } else {
      el.classList.remove("inview");
    }
  }
  _textAnimation(el, inview) {
    if (inview) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }
  _paceDone() {
    this._scrollInit();
    this._clickInit();
  }
  _clickInit() {
    this.sections.forEach(section =>
      section.addEventListener("click", function() {
        const detail = section.querySelector(`.${section.className}__detail`);
        section.classList.toggle("clicked");
        console.dir(`clicked:${detail}`);

        // console.log(section.className);
        // const title = section.querySelector(`.${section.className}__title`);
        // console.log(title);
        // title.classList.toggle("clicked");
      })
    );
  }
  _scrollInit() {
    this.observers = new ScrollObserver(".swiper-container", this._toggleSlideAnimation.bind(this), { once: false });
    this.observers = new ScrollObserver(".tween-animate-title", this._textAnimation);
    this.observers = new ScrollObserver(".clicked", this._textAnimation);
    this.observers = new ScrollObserver(".appear", this._inviewAnimation);
  }
}
