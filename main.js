//Give Your NAME ~~Start() Function
function start() {
  document.querySelector(".control-buttons span").onclick = function () {
    var yourName = prompt("Give Me Your Name ");
    if (yourName == "" || yourName == null) {
      document.querySelector(".name span").innerHTML = "Unknown";
    } else {
      document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();

    // Set Timer
    let music = document.getElementById("calm");
    let myTimerSpan = document.querySelector(".timer span");
    music.play();
    let timerDuration = Math.floor(music.duration) - 110;

    myTimerSpan.innerHTML = timerDuration;

    //How To End game

    let timerInterval = setInterval(() => {
      let currentTime = parseInt(myTimerSpan.innerHTML);

      if (currentTime > 0 && endGame()) {
        myTimerSpan.innerHTML = parseInt(myTimerSpan.innerHTML);
        document.body.appendChild(endContainer);
        endMessage.textContent = "Congarts You Win !!!";
        endTries.textContent = ` You Won and ${myTimerSpan.innerHTML} Seconds Left  `;
        clearInterval(timerInterval);
      } else if (currentTime > 0 && endGame() == false) {
        // Continuer à décrémenter le timer
        myTimerSpan.innerHTML = currentTime - 1;
      } else {
        myTimerSpan.innerHTML = "0";
        document.body.appendChild(endContainer);
        endMessage.textContent = `You "${myName.innerHTML}" The Looooser!!! `;
        endTries.textContent = ` You Did ${triesElements.innerHTML} tries `;
        //Add End Music
        music.pause();
        document.getElementById("fail").play();
        //
        clearInterval(timerInterval);
      }
    }, 1000);
  };
}
//Triger The Start Function
start();

//Settings
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...blocks.keys()];
//let orderRange2 = [...Array(25).keys()];

let endContainer = document.getElementsByClassName("end-game")[0];
let endMessage = document.querySelector(".message");
let endTries = document.querySelector(".tries-num");
endContainer.remove();
//
let myTimerSpan = document.querySelector(".timer span");
//
let triesElements = document.querySelector(".tries span");
//
let myName = document.querySelector(".name span");

//Add Orders To Blocks
blocks.forEach((block) => {
  let randomOrd = orderRange[Math.floor(Math.random() * orderRange.length)];

  orderRange = orderRange.filter(function (ele) {
    return ele !== randomOrd;
  });

  block.style.order = randomOrd;
});

//Triger The Flip Blockk Function
blocks.forEach((block) => {
  block.addEventListener("click", function () {
    if (block.classList.value === "game-block is-flipped") {
      block.classList.remove("is-flipped");
    } else {
      flipBlock(block);
    }
  });
});

//Flib Block Function
function flipBlock(selectedBlockk) {
  // Add Class is-flipped
  selectedBlockk.classList.add("is-flipped");

  //Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    ////Stop Clicking Function
    stopClicking();
    //Function Matched Blocks
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

//Stop Clicking Function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    //Remove no-clicking After The Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//Function Matched Blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElements = document.querySelector(".tries span");
  if (firstBlock.dataset.img === secondBlock.dataset.img) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    triesElements.innerHTML = parseInt(triesElements.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

//Function To endGame
function endGame() {
  let test = true;
  for (let i = 0; i < blocks.length; i++) {
    if (!blocks[i].classList.contains("has-match")) {
      test = false;
    }
  }
  return test;
}
