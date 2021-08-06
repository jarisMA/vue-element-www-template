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
    div.id = "feedback";
    bar.appendChild(div);
    this.$dom = div;
    this.$dom.addEventListener("click", this.clickFn);
  }
}

export class NoteComponent {
  constructor(clickFn) {
    this.clickFn = clickFn;
  }

  createEl(el) {
    const bar = el.querySelector(".prism-controlbar");
    const div = document.createElement("div");
    div.className = "note-btn";
    div.id = "note";
    bar.appendChild(div);
    this.$dom = div;
    this.$dom.addEventListener("click", this.clickFn);
  }
}

export class NextVideoComponent {
  constructor(countTime, nextVideo, submitFn) {
    this.countTime = countTime;
    this.nextVideo = nextVideo;
    this.submitFn = submitFn;
    this.timer = null;
  }

  createEl(el) {
    const div = document.createElement("div");
    div.className = "next-video-container";
    div.id = "next-video-container";
    div.innerHTML = `<div class="next-video-dialog">
        <div class="next-video-dialog_header">
          <span class="primary next-video-count-time">${this.countTime} </span>秒后自动播放下一个视频
        </div>
        <div class="next-video-dialog_content">
          <i class="video-icon"></i>
          <label class="next-video-name">${this.nextVideo.name}</label>
        </div>
        <div class="next-video-dialog_footer">
          <div class="next-video-btn next-video-btn_cancel">取消</div>
          <div class="next-video-btn next-video-btn_submit">立即播放</div>
        </div>
      </div>`;
    div.style.display = "none";
    this.$dom = div;
    el.appendChild(div);
  }
  handleClick(e) {
    const { className } = e.target;
    if (className.indexOf("next-video-btn_submit") > -1) {
      return this.handleSubmit();
    }
    if (className.indexOf("next-video-btn_cancel") > -1) {
      return this.handleCancel();
    }
  }
  show() {
    this.$dom.style.display = "flex";
    this.$dom.addEventListener("click", this.handleClick.bind(this));
    let countTime = this.countTime;
    this.$dom.querySelector(".next-video-count-time").innerHTML = countTime;
    this.timer = setInterval(() => {
      countTime--;
      this.$dom.querySelector(".next-video-count-time").innerHTML = countTime;
      if (countTime <= 0) {
        this.handleSubmit();
        clearInterval(this.timer);
      }
    }, 1000);
  }
  handleCancel() {
    clearInterval(this.timer);
    this.$dom.removeEventListener("click", this.handleClick.bind(this));
    this.$dom.style.display = "none";
  }
  handleSubmit() {
    this.handleCancel();
    this.submitFn();
  }
}
