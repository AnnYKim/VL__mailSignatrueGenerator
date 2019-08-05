const infoName = document.querySelector(".infoBox__name");
const infoResult = document.querySelector(".infoBox-result");
const generateButton = document.querySelector(".generate-button");

function validateForm() {
  var mailForm = document.forms["mailForm"];
  var name = mailForm["name"];
  var nickname = mailForm["nickname"];
  var job = mailForm["job"];
  var position = mailForm["position"];
  var mail = mailForm["mail"];
  var phone = mailForm["phone"];
  var formError = document.querySelector(".formError");
  var message = "";
  var nicknamePattern = /^[a-zA-Z\s]+$/;
  var emailPattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  var phonePattern = /^01([0|1|6|7|8|9]?)-([0-9]{3,4})-([0-9]{3,4})$/;

  if (name.value === "") {
    message = "앗, 잠시만요! 이름이 빠져있어요.";
    formError.innerHTML = message;
    name.focus();
    return false;
  }

  if (nickname.value === "") {
    message = "앗, 잠시만요! 별명이 빠져있어요.";
    formError.innerHTML = message;
    nickname.focus();
    return false;
  }

  if (job.value === "") {
    message = "앗, 잠시만요! 영문직함이 빠져있어요.";
    formError.innerHTML = message;
    job.focus();
    return false;
  }

  if (position.value === "") {
    message = "앗, 잠시만요! 국문직함이 빠져있어요.";
    formError.innerHTML = message;
    position.focus();
    return false;
  }

  if (mail.value === "") {
    message = "앗, 잠시만요! 메일주소가 빠져있어요.";
    formError.innerHTML = message;
    mail.focus();
    return false;
  }

  if (phone.value === "") {
    message = "앗, 잠시만요! 휴대전화번호가 빠져있어요.";
    formError.innerHTML = message;
    phone.focus();
    return false;
  }

  if (!nicknamePattern.test(nickname.value)) {
    message = "앗, 잠시만요! 별명은 영문으로 입력해주세요.";
    formError.innerHTML = message;
    nickname.focus();
    return false;
  }

  // if (!nicknamePattern.test(job.value)) {
  //   message = "앗, 잠시만요! 영문직함은 영문으로 입력해주세요.";
  //   formError.innerHTML = message;
  //   job.focus();
  //   return false;
  // }

  if (!emailPattern.test(mail.value)) {
    message = "앗, 잠시만요! 메일주소 형식을 확인해주세요.";
    formError.innerHTML = message;
    mail.focus();
    return false;
  }

  if (!phonePattern.test(phone.value)) {
    message = "앗, 잠시만요! 전화번호는 10~11자의 하이픈 형태로 입력해주세요.";
    formError.innerHTML = message;
    phone.focus();
    return false;
  }

  formError.innerHTML = "";
  generateInfo();
}

const generateInfo = function(e) {
  var infoList = infoResult.children;
  const infoListArray = [];
  const infoName = infoList[0].children[1].value;

  for (let i = 0; i < infoList.length; i++) {
    infoListArray.push(infoList[i].children[1].value);
  }

  let htmlData = `<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="format-detection" content="email=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

  <style>#body a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
  };
    *[x-apple-data-detectors], .x-gmail-data-detectors, .x-gmail-data-detectors *, .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    };
  </style>
</head>

<body id="body">
  <table width="100%" cellpadding="0" cellspacing="0" style="table-layout: fixed;margin-top:0;">
    <tbody>
      <tr>
        <td><img src="https://vitolabimages.s3.ap-northeast-2.amazonaws.com/mailSignature/logo-symbol.png"
            alt="VitoLabs Logo" style="display:block;width:29px;margin:0;padding:0;"></td>
      </tr>
      <tr>
        <td>
          <p style="font-size:20px;color:#231815;margin-top:13px;margin-bottom:6px;line-height: 1;
            font-weight:900;">
            Hello, I'm ${infoListArray[1]}!</p>
        </td>
      </tr>
      <tr>
        <td>
          <div
            style="width:100%; max-width: 700px; height:2px; background:#353535; margin-top:8px; margin-bottom:16px;">
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <p style="font-size:14px;color:#231815;line-height:1;font-weight:400;margin:0;"><strong style="font-size:14px;color:#231815;line-height:1;font-weight: 900;" >${
            infoListArray[0]
          }</strong> <span style="font-size:14px;color: #231815;margin-left:0px;line-height:1;font-weight: 400;">${
    infoListArray[3]
  }</span><span style="display:inline-block;line-height:1;font-size:14px;margin-left:7px;margin-right:7px;color:#353535;">|</span><span style="font-size:15px;font-weight:900;">${
    infoListArray[2]
  }</span> </p><p style="font-size:14px;color:#231815;line-height:1;font-weight:400;margin:0;margin-top:9px;"><a style="font-size:14p;xcolor:#231815;text-decoration:none!important;">${
    infoListArray[4]
  }</a><span style="display:inline-block;line-height:1;font-size:14px;margin-left:7px;margin-right:7px;color:#353535;">|</span><a style="color:#231815;margin:0;padding:0;text-decoration:none;">`;

  if (infoListArray[5] === "") {
    htmlData += "";
  } else {
    htmlData += `${infoListArray[5].split("-")[0]}. ${
      infoListArray[5].split("-")[1]
    }. ${infoListArray[5].split("-")[2]}`;
  }

  htmlData += `</a></p><p style="font-size:14px;color:#231815;line-height:1;font-weight:400;margin:0;margin-top:8px;"><img src="https://vitolabimages.s3.ap-northeast-2.amazonaws.com/mailSignature/logo-typo.png" width="70" alt="VitoLabs Logo" style="display:inline-block;margin:0;padding:0;line-height:1; vertical-align: middle;"><span style="font-size:14px;color:#231815;line-height: 1;
            font-weight:400;margin-left:6px;">서울시 중구 삼일대로 <a style="color:#231815!important;margin:0;padding:0;text-decoration:none!important;">343, 16</a>층
              비토랩스 (<a style="color:#231815!important;margin:0;padding:0;text-decoration:none!important;">0&zwnj;4&zwnj;5&zwnj;3&zwnj;8</a>)</span></p>
        </td>
      </tr>
    </tbody>



  </table>
  <!-- //table -->

</body>

</html>
  `;

  var win = window.open(
    "",
    "",
    "width=700,height=450,resizable=yes,top=0,left=0,"
  );

  win.document.write(htmlData);
  win.document.title = `${infoName}님의 메일서명`;
};

generateButton.addEventListener("click", validateForm);
