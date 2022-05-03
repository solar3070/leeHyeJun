import pic1 from "./assets/짱구.png";
import pic2 from "./assets/유리.png";
import pic3 from "./assets/맹구.png";
import pic4 from "./assets/훈이.png";
import pic5 from "./assets/철수.png";

const $ = (selector) => document.querySelector(selector);

let currentStep = 0;

const quizList = [
  {
    src: pic1,
    answer: "짱구",
  },
  {
    src: pic2,
    answer: "유리",
  },
  {
    src: pic3,
    answer: "맹구",
  },
  {
    src: pic4,
    answer: "훈이",
  },
  {
    src: pic5,
    answer: "철수",
  },
];

function initGame({ score, image }) {
  currentStep = 0;
  score.innerText = 0;
  image.src = quizList[currentStep].src;
}

function showModal(modalContent) {
  $(".modal__body").innerHTML = modalContent;
  $(".modal").classList.remove("hide");
}

function goNextStep(score, image) {
  currentStep++;
  score.innerText = +score.innerText + 1;

  if (currentStep === quizList.length) {
    showModal(`<a href="/">메인화면으로</a>`);
    return;
  }

  image.src = quizList[currentStep].src;
  const scoreBoard = $(".scoreBoard");
  scoreBoard.classList.add("scored");
  setTimeout(() => {
    scoreBoard.classList.remove("scored");
  }, 1500);
  showModal("호호이~ 이미지 로딩중!");
}

function attachEvent({ score, answer, image }) {
  answer.addEventListener("click", (e) => {
    if (e.target instanceof HTMLLIElement) {
      const currentAnswer = e.target.innerText;
      const realAnswer = quizList[currentStep].answer;

      if (currentAnswer === realAnswer) goNextStep(score, image);
      else showModal(`땡! 나는 ${currentAnswer}가 아니야`);
    }
  });

  image.addEventListener("load", () => {
    modal.classList.add("hide");
  });

  $(".buttonList__shuffle").addEventListener("click", () => {
    initGame({ score, image });
  });

  const modal = $(".modal");
  modal.addEventListener("click", (e) => {
    e.target === modal ? modal.classList.add("hide") : false;
  });
}

function gameManager(gameInfo) {
  initGame(gameInfo);
  attachEvent(gameInfo);
}

window.onload = () => {
  gameManager({
    score: $(".scoreBoard__score"),
    answer: $("ul.answer__list"),
    image: $(".imageBoard > img"),
  });
};
