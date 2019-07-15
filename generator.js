// const endpoint = "https://s3.ap-northeast-2.amazonaws.com/thevitolabs.com/signatureGenerator/mailSignatureData.json";

const endpoint =
  // "https://raw.githubusercontent.com/AnnYKim/VL__mailSignatrueGenerator/master/mailSignatureData.json";
  "https://gist.githubusercontent.com/AnnYKim/38694a70e8824bf3bae383b263ae78d7/raw/e329a1f00a400adb9d9c4290dccbbedbc629860f/testtest.json";
// "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const people = [];
const searchInput = document.querySelector(".search");
const resultArea = document.querySelector(".search-result");

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

// // 3. 숫자에 천 단위 콤마 표시
// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// 4. 일치하는 단어 보여주기
function displayMatches() {
  const matchArray = findMatches(this.value, people);
  // const html = matchArray
  //   .map(data => {
  //     const regex = new RegExp(this.value, "gi");
  //     const cityName = data.city.replace(
  //       regex,
  //       `<em class="accent">${this.value}</em>`
  //     );
  //     const stateName = data.state.replace(
  //       regex,
  //       `<em class="accent">${this.value}</em>`
  //     );
  //     return `
  //       <li class="hi">
  //         <span class="name">${cityName}, ${stateName}</span>
  //         <span class="population">${data.population}</span>

  //       </li>`;
  //   })
  //   .join("");
  // resultArea.innerHTML = "";
  // newdiv.innerHTML = html;
  // resultArea.appendChild(newdiv);
  // resultArea.addEventListener("click", hi);
  // if (this.value === "") {
  //   resultArea.innerHTML = "";
  // }
  if (this.value === "") {
    console.log("검색어없음");
    resultArea.innerHTML = "";
    return false;
  }
  resultArea.innerHTML = matchArray
    .map(data => {
      const regex = new RegExp(this.value, "gi");
      const personName = data.name.replace(
        regex,
        `<em class="accent">${(this.value.toLowerCase())}</em>`
      );
      const personNickname = data.nickname.replace(
        regex,
        `<em class="accent">${(this.value.toLowerCase())}</em>`
      );
      if (personNickname === "") {
        return `
        <li class="hi" tabindex="0">
        <p>
          <span class="name">${personName}</span>
        </p>
          <p class="population">${data.lab}</p>
        </li>`;
      } else {
        return `
        <li class="hi" tabindex="0">
        <p>
          <span class="nickanme">${personNickname}</span>
          <span class="name">(${personName})</span>
        </p>
          <p class="population">${data.position}</p>
        </li>`;
      }
    })
    .join("");
  // resultArea.appendChild(newdiv);

  resultArea.addEventListener("click", showModal);

}
// 5. 이벤트 리스너 달기
// searchInput.addEventListener("input", displayMatches);
// ====================

const infoResult = document.querySelector(".infoBox-result");
const modal = document.querySelector(".modal");
const modalClose = modal.children[0].children[0];
const infoName = document.querySelector(".infoBox__name");
const generateButton = document.querySelector(".generate-button");

const hideModal = function () {
  modal.classList.remove("modal-init");
  modal.classList.remove("modal-show");
  modal.classList.add("modal-hide");
}
const showModal = function (e) {
  if (e === undefined) {
    console.log(this);
  }
  modal.classList.remove("modal-init");
  modal.classList.remove("modal-hide");
  modal.classList.add("modal-show");
  var info = findMatches(e.target.children[0].children[0].innerText, people);
  console.dir(e.target.children[0].children[0].innerText);
  console.dir(info);
  const infoArray = Object.values(info[0]);
  const infoList = ["이름", "별명", "영문직함", "국문직함", "메일주소", "전화번호"];
  let infoHtml = "";
  console.log(infoArray);
  for (let i = 0; i < infoArray.length; i++) {
    infoHtml += `<li><label>${infoList[i]}</label>
                <input type="text" value="${infoArray[i]}"/></li>`
  }
  infoName.innerText = info[0].name;
  infoResult.innerHTML = infoHtml;
  console.log(infoHtml);

  // // console.log(info[0].rank);
  // infoName.innerText = info[0].name;
  // infoResult.children[0].children[1].value = info[0].name;
  // infoResult.children[1].children[1].value = info[0].nickname;
  // infoResult.children[2].children[1].value = info[0].job;
  // infoResult.children[5].children[1].value = info[0].mail + "@thevitolabs.com";
};
modalClose.addEventListener("click", hideModal);
// var a = matchArray.map(data => {
//   const regex = new RegExp(this.value, "gi");
//   const cityName = data.city.replace(
//     regex,
//     `<em class="accent">${this.value}</em>`
//   );
//   const stateName = data.state.replace(
//     regex,
//     `<em class="accent">${this.value}</em>`
//   );
//   return `
//         <li class="hi">
//           <span class="name">${cityName}, ${stateName}</span>
//           <span class="population">${data.population}</span>
//         </li>`;
// });


//=========
//입력된 데이터 배열로 만들기

const generateInfo = function (e) {
  // if (e.target.classList.contains("generate-button")) {
  //   console.dir(e.target.previousElementSibling.value);
  //   e.target.previousElementSibling.readOnly = false;
  //   e.target.previousElementSibling.focus();
  //   console.log("!!!")
  // }

  const infoList = infoResult.children;
  const infoListArray = [];
  const infoName = infoList[0].children[1].value;

  for (let i = 0; i < infoList.length; i++) {
    infoListArray.push(infoList[i].children[1].value);
  }
  console.dir(infoListArray);

  let htmlData = `<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <meta name="format-detection" content="telephone=no" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<body>


  <table width="100%" cellpadding="0" cellspacing="0" style="table-layout: fixed;margin-top:340px;">
    <tbody>
      <tr>
        <td><img src="https://vitolabimages.s3.ap-northeast-2.amazonaws.com/mailSignature/logo-symbol.png"
            alt="VitoLabs Logo" style="display:block;width:34px;margin:0;padding:0;"></td>
      </tr>
      <tr>
        <td>
          <p style="font-size:20px;color:#231815;margin-top:14px;margin-bottom:10px;line-height: 1;
            font-weight:900;">
            Hello, I'm ${infoListArray[1]}!</p>
        </td>
      </tr>
      <tr>
        <td>
          <div
            style="width:100%; max-width: 700px; height:2px; background:#231815; margin-top:8px; margin-bottom:20px;">
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <p style="font-size:14px;color:#231815;line-height:1;font-weight:400;"><strong style="font-size:14px;color:#231815;line-height:1;font-weight: 900;" >${infoListArray[0]}</strong><span style="font-size:14px;color: #231815;margin-left:3px;line-height:1;font-weight: 400;">${infoListArray[3]}</span><span style="font-size:14px;display:inline-block;width: 2px;height:12px;vertical-align:middle;background: #231815;margin-left:6px;margin-top:-0.5px;margin-right:6px;"></span><span style="font-size:14px;">${infoListArray[2]}</span> </p><p style="font-size:14px;color:#231815;line-height:1;font-weight:400;margin-top:5px;margin-bottom:5px;"><astyle="color:#231815;text-decoration:none;">${infoListArray[4]}</a><span style="display:inline-block;width:2px;height:12px;vertical-align:top;line-height:1;background:#231815;margin-top:1px;margin-left:8px;margin-right:8px;"></span><a style="color:#231815;margin:0;padding:0;text-decoration:none;">`;

  if (infoListArray[5] === "") {
    htmlData += ""
  } else {
    htmlData += `${(infoListArray[5].split('-')[0])}. ${(infoListArray[5].split('-')[1])}. ${(infoListArray[5].split('-')[2])}`;
  };

  htmlData += `</a></p><p style="font-size:14px;color:#231815;line-height:1;font-weight:400;"><img src="https://vitolabimages.s3.ap-northeast-2.amazonaws.com/mailSignature/logo-typo.png" alt="VitoLabs Logo" style="display:inline-block;width:78px;margin:0;margin-bottom:1px;padding:0;line-height:1; vertical-align: middle;"><span style="font-size:14px;color:#231815;line-height: 1;
            font-weight:400;margin-left:6px;">서울시 중구 삼일대로 <a style="color:#231815;margin:0;padding:0;text-decoration:none;">343, 16</a>층
              비토랩스 (<a style="color:#231815;margin:0;padding:0;text-decoration:none;">04538</a>)</span></p>
        </td>
      </tr>
    </tbody>



  </table>
  <!-- //table -->

</body>

</html>
  `;

  var win = window.open("", "", "width=700,height=600,resizable=yes");

  win.document.write(htmlData);
  win.document.title = `${infoName}님의 메일서명`;

};

generateButton.addEventListener("click", generateInfo);

function testFunc(e) {
  if (event.keyCode === 13) {
    showModal(e);
  }
}
searchInput.addEventListener("keyup", displayMatches);
resultArea.addEventListener("keyup", testFunc);