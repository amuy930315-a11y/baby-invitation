// =========================
// RSVP
// =========================

const yes =
  document.getElementById("yes");

const no =
  document.getElementById("no");

const guestFields =
  document.getElementById("guestFields");

const guestCount =
  document.getElementById("guestCount");

const form =
  document.getElementById("rsvpForm");

const successMessage =
  document.getElementById("successMessage");


// =========================
// 選擇參與
// =========================

yes.addEventListener(
  "change",
  function () {

    if (yes.checked) {

      guestFields.style.display =
        "block";

      guestCount.required =
        true;

    }

  }
);


// =========================
// 選擇不參與
// =========================

no.addEventListener(
  "change",
  function () {

    if (no.checked) {

      guestFields.style.display =
        "none";

      guestCount.required =
        false;

    }

  }
);


// =========================
// Google 試算表網址
// =========================

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyJlSy56-FN6uBws_Yrh2_gyaBkYPY1iXmkDpb3So-fW_GUK00tnL6qlC0n5VeureE/exec";


// =========================
// 送出 RSVP
// =========================

form.addEventListener("submit", function (event) {

  event.preventDefault();

  const name =
    document
      .getElementById("guestName")
      .value
      .trim();

  const attendance =
    document.querySelector(
      'input[name="attendance"]:checked'
    );


  // 沒填姓名
  if (!name) {
    alert("請輸入您的姓名 ♡");
    return;
  }


  // 沒選參與 / 不參與
  if (!attendance) {
    alert("請選擇是否參與滿月宴 ♡");
    return;
  }


  const submitButton =
    document.querySelector(".submit-btn");


  // 準備資料
  const data = {

    name: name,

    attendance: attendance.value,

    guestCount:
      attendance.value === "參與"
        ? guestCount.value
        : ""

  };


  // 按鈕變成送出中
  submitButton.disabled = true;

  submitButton.textContent =
    "正在送出 ♡";


  // =========================
  // 傳送到 Google 試算表
  // =========================

  fetch(SCRIPT_URL, {

    method: "POST",

    mode: "no-cors",

    body: JSON.stringify(data),

    headers: {
      "Content-Type":
        "text/plain;charset=utf-8"
    }

  });


  // =========================
  // 切換到「已收到回覆」
  // =========================

  form.style.display = "none";

  successMessage.style.display = "flex";


  // 自動跳到成功畫面
  setTimeout(function () {

    successMessage.scrollIntoView({
      behavior: "auto",
      block: "center"
    });

  }, 100);

});
