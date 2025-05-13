const icons = document.querySelectorAll(".icon");
const popup = document.getElementById("popupWindow");
const closeBtn = document.querySelectorAll(".popupClose");
const popupHeader = document.getElementById("popupHeader");
const taskbarIcon = document.querySelector(".Taskbar_icon");

let isPopupDragging = false;
let popupOffsetX = 0;
let popupOffsetY = 0;

taskbarIcon.addEventListener("click", (e) => {
  popup.style.display = "block";
  popup.style.left = "calc(50% - 200px)";
  popup.style.top = "calc(50% - 150px)";
  e.stopPropagation();
});

popupHeader.addEventListener("mousedown", (e) => {
  isPopupDragging = true;
  popupOffsetX = e.clientX - popup.offsetLeft;
  popupOffsetY = e.clientY - popup.offsetTop;
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (isPopupDragging) {
    popup.style.left = `${e.clientX - popupOffsetX}px`;
    popup.style.top = `${e.clientY - popupOffsetY}px`;
  }
});

document.addEventListener("mouseup", (e) => {
  isPopupDragging = false;
});

document.addEventListener("dblclick", (e) => {
  if (!e.target.closest(".icon")) {
    icons.forEach(i => i.classList.remove("selected"));
  }
});

icons.forEach(icon => {
  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  icon.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - icon.offsetLeft;
    offsetY = e.clientY - icon.offsetTop;
    isDragging = true;
    icon.classList.add("selected");
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      icon.style.left = `${e.clientX - offsetX}px`;
      icon.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  icon.addEventListener("click", (e) => {
    icons.forEach(i => i.classList.remove("selected"));
    icon.classList.add("selected");
    e.stopPropagation();
  });

  icon.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  icon.addEventListener("dblclick", (e) => {
    popup.style.display = "block";
    popup.style.left = `${e.clientX + 20}px`;
    popup.style.top = `${e.clientY + 20}px`;
    e.stopPropagation();
  });
});

closeBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});

popup.addEventListener("mousedown", (e) => {
  isDraggingPopup = true;
  popupOffsetX = e.clientX - popup.offsetLeft;
  popupOffsetY = e.clientY - popup.offsetTop;
});

document.addEventListener("dblclick", (e) => {
  if (!e.target.closest(".icon")) {
    icons.forEach(i => i.classList.remove("selected"));
  }
});