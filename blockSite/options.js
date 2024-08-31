const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

save.addEventListener("click", () => {
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ blocked });
alert("Changes Saved");
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
  chrome.storage.local.set({ enabled });
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked)) {
      textarea.value = blocked.join("\n");
      checkbox.checked = enabled;
    }
  });
});
const buttons=document.querySelectorAll('a');
buttons.forEach(btn => {
btn.addEventListener('click',function(e){

  let x=e.clientX-e.target.offsetLeft;
  let y=e.clientY-e.target.offsetTop;
  let ripples=document.createElement('span');
  ripples.style.left=x+'px';
  ripples.style.top=y+'px';
  this.appendChild(ripples);
  setTimeout(() =>
  {
    ripples.remove()
  },1000);
  })
})