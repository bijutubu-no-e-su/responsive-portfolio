import Swiper from "swiper";

export class HeroSlider {
  constructor(el) {
    this.el = el;
    this.swiper = this._initSwiper();
  }
  _initSwiper() {
    return new Swiper(this.el, {
      //Optional parameters

      direction: "horizontal",
      loop: true,
      grabCursor: true,
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: 1,
      speed: 1000,
      breakpoints: {
        1024: {
          slidesPerView: 2
        }
      },
      autoplay: {
        delay: 4000
        //disableOnInteraction: false
      }
    });
  }
  start(options = {}) {
    options = {
      ...{
        delay: 4000,
        disableOnInteraction: true
      },
      ...options
    };
    this.swiper.params.autoplay = options;
    this.swiper.autoplay.start();
  }
  stop() {
    this.swiper.autoplay.stop();
  }
}
