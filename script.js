var inputText = document.querySelector("#inputText");
var SaverButton = document.getElementById("saveBtn");
var afterBtn = document.getElementById("after");
// var beforeBtn = document.getElementById("before");
var h3 = document.getElementById("textShower");
const theTimer = document.querySelector(".timer");
// const titleText = document.querySelector("#inputTitle");
const doneButton = document.getElementById("btnDone");
const showButton = document.getElementById("btnShow");
const endReadingButton = document.getElementById("btnEndReading");
let textArray;
if (localStorage.getItem("result")) {
  textArray = JSON.parse(localStorage.getItem("result"));
} else {
  textArray = [];
}


var timer = [0, 0, 0, 0];
var timerRunnig = false;
var interval;


window.onbeforeunload = () => {
  localStorage.removeItem('result');
}


function main() {

  if (textArray != 0) {

    var textobj = textArray.find((object) => {
      return object.isShow == true;
    });

    h3.innerHTML = textobj.text;
  }

  if (textArray) {
    document.querySelector('a.btn-flat').innerHTML = `Number of texts : ${textArray.length}`;
  } else {
    document.querySelector('a.btn-flat').innerHTML = `Number of texts :  0`;
  }

  if (textArray.length >= 5) {
    doneButton.removeAttribute('style');
  }

  showButton.addEventListener('click', () => {

    afterBtn.removeAttribute('style');

    showButton.setAttribute('style', 'display:none;');
    // endReadingButton.removeAttribute('style');
    h3.removeAttribute('style');

    TimerOn();
  });




  doneButton.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(".card-content").style = "display:none;";
    document.querySelector(".card-action").removeAttribute('style');

  });
}




function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }

  return time;
}

function runTimer() {
  let currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);

  theTimer.innerHTML = currentTime;

  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100) - timer[0] * 60;
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

function Start() {
  if (textArray.length != 0 && !timerRunnig) {
    timerRunnig = true;
    interval = setInterval(runTimer, 10);
  }
}

SaverButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputText.value) {


    const textObject = {
      text: inputText.value,
      durationShow: "00:00:00",
      isShow: textArray.length == 0 ? true : false,
    };
    textArray.push(textObject);
    localStorage.setItem("result", JSON.stringify(textArray));
    if (textObject.isShow == true) {
      TimerOn();
    }
    inputText.value = "";
    main();
  }
});

function TimerOn() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunnig = false;
  Start();
}

function TimerOff() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunnig = false;
}

afterBtn.addEventListener("click", (e) => {


  if (!textArray.length == 0) {
    var textobj = textArray.find((object) => {
      return object.isShow == true;
    });
    var textObjIndex = textArray.indexOf(textobj);

    if (!textArray[textObjIndex + 2]) {
      endReadingButton.removeAttribute('style');
      afterBtn.setAttribute('style', 'Display:none');
    }

    if (textArray[textObjIndex + 1]) {
      textArray[textObjIndex].isShow = false;
      textArray[textObjIndex].durationShow =
        theTimer.innerHTML == "" ? "" : theTimer.innerHTML;
      // console.log(textArray);
      TimerOn();
      textArray[textObjIndex + 1].isShow = true;
      setResult(textArray[textObjIndex]);
      h3.innerHTML = textArray[textObjIndex + 1].text;
    } else {
      h3.innerHTML = textobj.text;

    }
  }
});
// beforeBtn.addEventListener("click", (e) => {
//   if (!textArray.length == 0) {
//     var textobj = textArray.find((object) => {
//       return object.isShow == true;
//     });
//     var textObjIndex = textArray.indexOf(textobj);
//     if (textArray[textObjIndex - 1]) {
//       TimerOn();
//       textArray[textObjIndex].isShow = false;
//       textArray[textObjIndex].durationShow = theTimer.innerHTML == "" ? "" : theTimer.innerHTML;

//       textArray[textObjIndex - 1].isShow = true;
//       setResult(textArray[textObjIndex]);
//       h3.innerHTML = textArray[textObjIndex - 1].text;
//     } else {
//       h3.innerHTML = textobj.text;
//     }
//   }
// });

endReadingButton.addEventListener('click', () => {
  if (!textArray.length == 0) {
    var textobj = textArray.find((object) => {
      return object.isShow == true;
    });

    var textObjIndex = textArray.indexOf(textobj);
    if (textArray[textObjIndex]) {

      textArray[textObjIndex].isShow = false;
      textArray[textObjIndex].durationShow = theTimer.innerHTML == "" ? "" : theTimer.innerHTML;
      TimerOff();





      textArray[0].isShow = true;

      setResult(textArray[textObjIndex]);
      h3.setAttribute('style', 'display:none;');
      afterBtn.setAttribute('style', 'display:none;');

      endReadingButton.setAttribute('style', 'display:none;');
    }
  }
});



function setResult(object) {
  if (localStorage.getItem("result")) {
    let textArrayInLocalStr = JSON.parse(localStorage.getItem("result"));
    textArrayInLocalStr.push(object);
    localStorage.setItem("result", JSON.stringify(textArray));
  } else {

    let NewArray = [];
    NewArray.push(object);
    localStorage.setItem("result", JSON.stringify(NewArray));
  }
}



document.addEventListener('keypress', (e) => {
  if (h3.style.display != 'none') {
    if (e.key == 'Enter') {
      afterBtn.click();
      console.log("Enter");
    }
  }

});

document.addEventListener("DOMContentLoaded", main);