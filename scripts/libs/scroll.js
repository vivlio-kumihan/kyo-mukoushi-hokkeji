class ScrollObserver {
  // 重要な考え方、
  // constructorで設定するものは『変数』にしておく、
  // 変数を導き出すための関数は切り分けておく。
  constructor(targetEmt, cb, options) {
    this.targetEls = document.querySelectorAll(targetEmt);
    this.cb = cb;
    const defaultOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
      once: true
    };
    // ScrollObserverで設定するオプションと初期設定のオプションをマージする。
    this.options = Object.assign(defaultOptions, options);
    // わざわざ別の変数に格納するのか？？？
    this.once = this.options.once;
    this._init();
  }
  _init() {
    const callBack = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 明示的にコールバック関数内に真偽値を入れることでより良い運用ができるようになるらしい、
          // この後の講座でそこらが説明されるかを留意しておく。
          // ここがコールバック関数の発火ポイント。
          //    コールバックの定義を書きにいく。
          //    コールバックでやりたいことは文字アニメーションだよ。
          this.cb(entry.target, true);
          if (this.once) {
            observer.unobserve(entry.target);
          }
        } else {
          this.cb(entry.target, false);
        }
      });
    };
    this.io = new IntersectionObserver(callBack.bind(this), this.options);
    
    // IntersectionObserverクラスが効かない場合の対処
    // 動画の中ではどこにあるか分からなかたから探した。
    // scroll-polyfill.jsのファイルのオリジナルはこちら
    //                   ↓
    // https://github.com/GoogleChromeLabs/intersection-observer
    // 『scroll-polyfill.js』として別名保存
    // 1/10s毎にスクロールのイベントを監視する。
    this.io.POLL_INTERVAL = 100;

    this.targetEls.forEach(el => {
      this.io.observe(el);
    });
  }

  destroy() {
    this.io.disconnect();
  }
}