const icons = document.querySelectorAll(".icon");
const popup = document.getElementById("popupWindow");
const closeBtn = document.getElementById("popupClose");

document.addEventListener("dblclick", (e) => {
  if (!e.target.closest(".icon")) {
    icons.forEach(i => i.classList.remove("selected"));
  }
});

icons.forEach(icon => {
  let isDragging = false;
  let startX, startY;
  let offsetX = 0, offsetY = 0;

  icon.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
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

  document.addEventListener("mouseup", (e) => {
    if (isDragging) {
      isDragging = false;
    }
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

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

document.addEventListener("click", (e) => {
  const isPopup = popup.contains(e.target);
  const isIcon = [...document.querySelectorAll(".icon")].some(icon => icon.contains(e.target));

  if (!isPopup && !isIcon) {
    popup.style.display = "none";
    icons.forEach(i => i.classList.remove("selected"));
  }
});
