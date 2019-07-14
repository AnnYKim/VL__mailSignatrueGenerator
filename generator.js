// const endpoint = "https://s3.ap-northeast-2.amazonaws.com/thevitolabs.com/signatureGenerator/mailSignatureData.json";

const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];
const searchInput = document.querySelector(".search");
const resultArea = document.querySelector(".search-result");

// 1. fetch로 파일내용 가져오기
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

// 2. 단어가 일치하는 데이터만 새 배열로 만들기
function findMatches(word, arr) {
  return arr.filter(place => {
    const regex = new RegExp(word, "gi");
    // return place.city.match(regex) || place.state.match(regex);
    return place.city.match(regex);
  });
}

// // 3. 숫자에 천 단위 콤마 표시
// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// 4. 일치하는 단어 보여주기
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
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
      const cityName = data.city.replace(
        regex,
        `<em class="accent">${this.value}</em>`
      );
      return `
        <li class="hi">
          <span class="name">${cityName}</span>
          <span class="population">${data.population}</span>
        </li>`;
    })
    .join("");
  // resultArea.appendChild(newdiv);

  resultArea.addEventListener("click", showModal);
}

// 5. 이벤트 리스너 달기
// searchInput.addEventListener("input", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

// ====================

const infoResult = document.querySelector(".infoBox-result");
const modal = document.querySelector(".modal");
const modalClose = modal.children[0].children[0];
const infoName = document.querySelector(".infoBox__name");
const generateButton = document.querySelector(".generate-button");

const hideModal = function () {
  modal.classList.remove("modal-show");
}
const showModal = function (e) {
  modal.classList.add("modal-show");
  var info = findMatches(e.target.children[0].innerText, cities);
  console.dir(info);

  console.log(info[0].rank);
  infoName.innerText = info[0].city;
  infoResult.children[0].children[1].value = info[0].city;
  infoResult.children[1].children[1].value = info[0].state;
  infoResult.children[2].children[1].value = info[0].rank;
  infoResult.children[5].children[1].value = info[0].city + "@thevitolabs.com";
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

  var win = window.open("", `dddㅁㄴ아러ㅣㅁㅇ너리ㅏㄴㅇ}`, "width=700,height=600,resizable=yes");

  win.document.write(infoListArray);
  win.document.title = `${infoName}님의 메일서명`;

};

generateButton.addEventListener("click", generateInfo);