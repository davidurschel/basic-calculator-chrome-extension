function calculate(
  historyResField,
  prevSym,
  currNum,
  prevNum,
  historyField,
  historyResField
) {
  if (prevSym == "+") {
    historyResField.value = "= " + (currNum + prevNum);
    prevNum = Number(prevNum + currNum);
  } else if (prevSym == "-") {
    historyResField.value = "= " + (prevNum - currNum);
    prevNum = Number(prevNum - currNum);
  } else if (prevSym == "*") {
    historyResField.value = "= " + currNum * prevNum;
    prevNum = Number(prevNum * currNum);
  } else if (prevSym == "/") {
    if (currNum != 0) {
      historyResField.value = "= " + prevNum / currNum;
      prevNum = Number(prevNum / currNum);
    } else {
      historyResField.value = "= undefined";
      prevNum = 0;
    }
  } else if (prevSym == "^") {
    historyResField.value = "= " + (prevNum ** currNum);
    prevNum = Number(prevNum ** currNum);
  } else {
    historyField.value = "";
    prevNum = currNum;
    historyResField.value = "= " + prevNum;
  }
  return prevNum;
}

document.addEventListener("DOMContentLoaded", function () {
  const historyField = document.getElementById("history");
  const historyResField = document.getElementById("historyRes");
  const resultField = document.getElementById("result");
  const buttons = document.querySelectorAll(".buttons button");

  var ans = 0;
  var currNum = 0;
  var prevNum = null;
  var prevSym = "";
  var dec = 0;
  var neg = false;

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonValue = button.innerHTML;

      if (!isNaN(Number(buttonValue))) {
        if (currNum < 0) {
          currNum *= -1;
          neg = true;
        } else {
          neg = false;
        }
        if (!dec) {
          currNum *= 10;
          currNum += Number(buttonValue);
          if (neg) {
            currNum *= -1;
          }
        } else {
          currNum = Number(
            Math.round(
              currNum +
                Number(buttonValue) * 10 ** (-1 * dec) +
                "e" +
                String(dec)
            ) +
              "e-" +
              String(dec)
          );
          dec += 1;
          if (neg) {
            currNum *= -1;
          }
        }

        resultField.value = currNum;
      } else if (buttonValue == ".") {
        if (!dec) {
          if (currNum == 0) {
            resultField.value += "0";
          }
          resultField.value += ".";
          dec = 1;
        }
      } else if (buttonValue == "C") {
        resultField.value = "";
        currNum = 0;
        dec = 0;
        prevNum = 0;
        prevSym = "";
      } else if (buttonValue == "CE") {
        resultField.value = "";
        historyResField.value = "";
        historyField.value = "";
        currNum = 0;
        dec = 0;
      } else if (buttonValue == "(-)") {
        currNum *= -1;
        resultField.value = currNum;
      } else if (buttonValue == "+") {
        if (Number(currNum) != 0) {
          prevNum = calculate(
            historyResField,
            prevSym,
            currNum,
            prevNum,
            historyField,
            historyResField
          );
          historyField.value = prevNum + " + ";
        } else {
          prevNum = calculate(
            historyResField,
            "",
            prevNum,
            prevNum,
            historyField,
            historyResField
          );
          historyField.value = prevNum + " + ";
        }
        prevSym = "+";
        currNum = 0;
        dec = 0;
        resultField.value = "";
      } else if (buttonValue == "-") {
        if (Number(currNum) != 0) {
          prevNum = calculate(
            historyResField,
            prevSym,
            currNum,
            prevNum,
            historyField,
            historyResField
          );
          historyField.value = prevNum + " - ";
        } else {
          prevNum = calculate(
            historyResField,
            "",
            prevNum,
            prevNum,
            historyField,
            historyResField
          );
          historyField.value = prevNum + " - ";
        }
        prevSym = "-";
        currNum = 0;
        dec = 0;
        resultField.value = "";
      } else if (buttonValue == "*") {
        if (Number(currNum) != 0) {
          prevNum = calculate(
            historyResField,
            prevSym,
            currNum,
            prevNum,
            historyField,
            historyResField
          );
          historyField.value = prevNum + " * ";
        } else {
          prevNum = calculate(
            historyResField,
            "",
            prevNum,
            prevNum,
            historyField,
            historyResField
          );
          historyField.value = prevNum + " * ";
        }
        prevSym = "*";
        currNum = 0;
        dec = 0;
        resultField.value = "";
      } else if (buttonValue == "^") {
        if (Number(currNum) != 0) {
          prevNum = calculate(
            historyResField,
            prevSym,
            currNum,
            prevNum,
            historyField,
            historyResField
          );
          historyField.value = prevNum + " ^ ";
        } else {
          prevNum = calculate(
            historyResField,
            "",
            prevNum,
            prevNum,
            historyField,
            historyResField
          );
          historyField.value = prevNum + " ^ ";
        }
        prevSym = "^";
        currNum = 0;
        dec = 0;
        resultField.value = "";
      } else if (buttonValue == "/") {
        if (Number(currNum) != 0) {
          prevNum = calculate(
            historyResField,
            prevSym,
            currNum,
            prevNum,
            historyField,
            historyResField
          );
          historyField.value = prevNum + " / ";
        } else {
          prevNum = calculate(
            historyResField,
            "",
            prevNum,
            prevNum,
            historyField,
            historyResField
          );
          historyField.value = prevNum + " / ";
        }
        prevSym = "/";
        currNum = 0;
        dec = 0;
        resultField.value = "";
      } else if (buttonValue == "=") {
        historyField.value += currNum;
        prevNum = calculate(
          historyResField,
          prevSym,
          currNum,
          prevNum,
          historyField,
          historyResField
        );
        prevSym = "";
        currNum = 0;
        dec = 0;
        resultField.value = "";
      }

      ans = prevNum;
    });
  });
});
