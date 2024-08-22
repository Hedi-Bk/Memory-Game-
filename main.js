//Give Your NAME To Start The Game
document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("Give Me Your Name ");
  if (yourName == "" || yourName == null) {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
  //Timer

  let music = document.getElementById("calm");
  let myTimerSpan = document.querySelector(".timer span");
  //music.play();
  let timerDuration = Math.floor(music.duration);
  myTimerSpan.innerHTML = timerDuration;
  setInterval(() => {
    if (parseInt(myTimerSpan.innerHTML) > 0) {
      myTimerSpan.innerHTML = parseInt(myTimerSpan.innerHTML) - 1;
    } else {
      myTimerSpan.innerHTML = 0;
      alert("Time's up!");
    }
  }, 1000);
};

//Settings
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);
console.log(blocks);

let orderRange = [...blocks.keys()];
//let orderRange2 = [...Array(25).keys()];

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
    //  document.getElementById("fail").play();
    setTimeout(() => {
      document.getElementById("fail").pause();
      document.getElementById("fail").currentTime = 0;
    }, 3500);
  }
}
/*

*/
