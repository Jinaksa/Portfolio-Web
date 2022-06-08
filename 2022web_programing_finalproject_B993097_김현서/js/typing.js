var typingBool = false;
var typingIdx = 0;
var liIndex = 0;
var liLength = $(".typed>ul>li").length;
var del = -1;
var repeatInt = null;
var tyInt = null;

var typingTxt = $(".typed>ul>li").eq(liIndex).text();

typingTxt = typingTxt.split("");

if (typingBool == false) {
  typingBool = true;
  tyInt = setInterval(typing, 200);
}

function typing() {
  if (typingIdx < typingTxt.length) {
    if (
      (typingIdx == 0 && typingTxt[typingIdx] == "A") ||
      (typingIdx == 1 && typingTxt[typingIdx] == "N")
    ) {
      $(".typing").append(typingTxt[typingIdx]);
    } else {
      var inText = "<span class='color'>" + typingTxt[typingIdx] + "</span>";
      $(".typing").append(inText);
    }
    typingIdx++;
    if (typingIdx == typingTxt.length) {
      clearInterval(tyInt);
      setTimeout(function () {
        tyInt = setInterval(typing, 200);
      }, 1000);
    }
  } else {
    if (-typingTxt.length - 1 < del) {
      var current = $(".typing").children("span").length;
      if (current === 0) {
        console.log("1");
        typingTxt = $(".typing").text();
        $(".typing").html(typingTxt.slice(0, del));
        del--;
      } else {
        $(".typing>span:last-child").remove();
      }
    } else {
      if (liIndex >= liLength - 1) {
        liIndex = 0;
      } else {
        liIndex++;
      }

      typingIdx = 0;
      del = -1;
      typingTxt = $(".typed>ul>li").eq(liIndex).text();

      clearInterval(tyInt);
      setTimeout(function () {
        tyInt = setInterval(typing, 200);
      }, 1000);
    }
  }
}
