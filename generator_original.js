const endpoint =
  "https://gist.githubusercontent.com/AnnYKim/5c0cc78d6b2569e4b83358544cc40c17/raw/4908d304d050779ca200791ed60009b5fd93ea04/testdata.json";

const people = [];
const searchInput = document.querySelector(".search");
const resultArea = document.querySelector(".search-result");
const infoResult = document.querySelector(".infoBox-result");
const modal = document.querySelector(".modal");
const modalClose = modal.children[0].children[0];
const infoName = document.querySelector(".infoBox__name");
const generateButton = document.querySelector(".generate-button");

// 1. fetch로 파일내용 가져오기
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => people.push(...data));

// 2. 단어가 일치하는 데이터만 새 배열로 만들기
function findMatches(word, arr) {
  return arr.filter(place => {
    const regex = new RegExp(word, "gi");
    // return place.city.match(regex) || place.state.match(regex);
    return place.name.match(regex) || place.nickname.match(regex);
  });
}

// 3. 일치하는 단어 보여주기
function displayMatches() {
  const matchArray = findMatches(this.value, people);
  if (this.value === "") {
    resultArea.innerHTML = "";
    return false;
  }
  resultArea.innerHTML = matchArray
    .map(data => {
      const regex = new RegExp(this.value, "gi");
      const personName = data.name.replace(
        regex,
        `<em class="accent">${this.value.toLowerCase()}</em>`
      );
      const personNickname = data.nickname.replace(
        regex,
        `<em class="accent">${this.value.toLowerCase()}</em>`
      );
      if (personNickname === "") {
        return `
        <li class="hi" tabindex="0">
        <p>
          <span class="name">${personName}</span>
        </p>
          <p class="position">${data.position}</p>
        </li>`;
      } else {
        return `
        <li class="hi" tabindex="0">
        <p>
          <span class="nickanme">${personNickname}</span>
          <span class="name">(${personName})</span>
        </p>
          <p class="position">${data.position}</p>
        </li>`;
      }
    })
    .join("");
}

// 4. 모달 숨기고 보여주기
const hideModal = function() {
  modal.classList.remove("modal-show");
  modal.classList.add("modal-hide");
};
const showModal = function(e) {
  modal.classList.remove("modal-hide");
  modal.classList.add("modal-show");
  var info = findMatches(e.target.children[0].children[0].innerText, people);
  const infoArray = Object.values(info[0]);
  const infoList = [
    "이름",
    "별명",
    "영문직함",
    "국문직함",
    "메일주소",
    "전화번호"
  ];
  let infoHtml = "";
  for (let i = 0; i < infoArray.length; i++) {
    infoHtml += `<li><label>${infoList[i]}</label>
                <input type="text" value="${infoArray[i]}"/></li>`;
  }
  infoName.innerText = info[0].name;
  infoResult.innerHTML = infoHtml;
};

const keyupHandler = function(e) {
  if (event.keyCode === 13) {
    showModal(e);
  }
};

// 5. 화면에 데이터 보여주기
const generateInfo = function(e) {
  const infoList = infoResult.children;
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

generateButton.addEventListener("click", generateInfo);
resultArea.addEventListener("click", showModal);
modalClose.addEventListener("click", hideModal);
searchInput.addEventListener("input", displayMatches);
// searchInput.addEventListener("change", displayMatches);
resultArea.addEventListener("keyup", keyupHandler);
