import Store from "@/store/index";

function randomTop(el) {
  el.style.top = Math.floor(Math.random() * (70 - 30 + 1)) + 30 + "%";
  const timer = setTimeout(() => {
    randomTop(el);
    clearTimeout(timer);
  }, 30 * 1000);
}

export class PhoneNumberComponent {
  constructor() {}

  createEl(el) {
    const userInfo = Store.state.userInfo;
    const div = document.createElement("div");
    div.innerHTML = userInfo.phone + userInfo.nickname;
    div.className = "phone-container";
    div.id = "phone-container";
    el.appendChild(div);
    randomTop(div);
  }
}

export class FeedbackComponent {
  constructor(clickFn) {
    this.clickFn = clickFn;
  }

  createEl(el) {
    const bar = el.querySelector(".prism-controlbar");
    const div = document.createElement("div");
    div.className = "feedback-btn";
    bar.appendChild(div);
    this.$dom = div;
    this.$dom.addEventListener("click", this.clickFn);
  }
}
