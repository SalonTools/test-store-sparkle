(() => {
  function addEventListener(target, name, callback) {
    target.addEventListener(name, callback, true);
    return function() {
      target.removeEventListener(name, callback, true);
    }
  }

  class GFFElement extends HTMLElement {
    constructor () {
      super();
      this._listeners = [];
    }
    attachListener(target, name, callback) {
      target.addEventListener(name, callback, true);
      this._listeners.push(() => {
        target.removeEventListener(name, callback, true);
      });
    }
    disconnectedCallback() {
      this._listeners.forEach(listener => listener());
      this._listeners.length = 0;
    }
  }

  class SwiperComponent extends GFFElement {
    constructor () {
      super();

      this.$swiper = this.querySelector('.gff-swiper');
      this.$slides = this.querySelectorAll('.swiper-slide');
      this.$prev = this.querySelector('.swiper-button-prev');
      this.$next = this.querySelector('.swiper-button-next');
      this.$pagination = this.querySelector('.swiper-pagination');
    }

    connectedCallback() {
      this.swiper = new Swiper(this.$swiper, {
        slidesPerView: 'auto',
        grabCursor: this.$slides.length > 1,
        loop: this.$swiper.hasAttribute('data-loop'),
        navigation: {
          nextEl: this.$next,
          prevEl: this.$prev,
        },
        pagination: {
          el: this.$pagination,
          type: 'bullets',
          clickable: true
        },
      });
    }
  }

  customElements.define('gff-swiper', SwiperComponent);
})();
