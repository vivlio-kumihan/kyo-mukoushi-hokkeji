"use strict";

class OpenClose {
  constructor() {
    this._init();
  }

  _init() {
    const nextBtns = document.querySelectorAll(".next-btn");
    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const dataTitle = btn.getAttribute("data-title");
        const innerContents = document.querySelector(
          `.inner-contents[data-title="${dataTitle}"]`
        );

        const isOpen = innerContents.classList.contains("show");

        // クラスの切り替え
        innerContents.classList.toggle("show", !isOpen);
        innerContents.classList.toggle("hide", isOpen);

        // ボタンテキストの切り替え
        btn.textContent = isOpen ? "続きを見る..." : "閉じる";
      });
    });
  }
}

// "use strict";

// class OpenClose {
//   constructor() {
//     this._init();
//   }

//   _init() {
//     const nextBtns = document.querySelectorAll(".next-btn");
//     nextBtns.forEach((btn) => {
//       btn.addEventListener("click", (e) => {
//         const dataTitle = btn.getAttribute("data-title");
//         const innerContents = document.querySelector(
//           `.inner-contents[data-title="${dataTitle}"]`
//         );
//         if (innerContents.classList.contains("show")) {
//           innerContents.classList.remove("show");
//           innerContents.classList.add("hide");
//           btn.textContent = "続きを見る...";
//         } else {
//           innerContents.classList.remove("hide");
//           innerContents.classList.add("show");
//           btn.textContent = "閉じる";
//         }
//       })
//     })
//   }
// }
