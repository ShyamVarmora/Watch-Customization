function setShape(shape) {
  const dial = document.getElementById("dial");
  if (shape === "circle") {
    dial.style.borderRadius = "50%";
  } else if (shape === "square") {
    dial.style.borderRadius = "0%";
  }
}

function setStrapColor(color) {
  const strap1 = document.querySelector(".watch-strap1");
  const strap2 = document.querySelector(".watch-strap2");
  strap1.style.backgroundColor = color;
  strap2.style.backgroundColor = color;
}

function setDialColor(color) {
  const dial = document.querySelector("#dial");
  dial.style.backgroundColor = color;
}

document.querySelectorAll(".color-box").forEach(box => {
  const color = box.dataset.color;
  if (color) box.style.backgroundColor = color;
});

function clearWatch() {
  const dial = document.getElementById("dial");
  dial.style.borderRadius = "50%";
  dial.style.backgroundColor = "";
  document.querySelectorAll('.watch-strap1, .watch-strap2').forEach(strap => {
    strap.style.backgroundColor = ""; 
  });
}

document.querySelectorAll(".strap-type .option-box").forEach(box => {
  box.onclick = () => alert(`Strap type: ${box.innerText} selected`);
});
