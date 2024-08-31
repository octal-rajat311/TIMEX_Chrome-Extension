let timer;
const countdownElt = document.getElementById('countdown');

document.getElementById("set").onclick = function() {
    let hours = parseInt(document.getElementById("hrs").value) || 0;
    let minutes = parseInt(document.getElementById("mins").value) || 0;
    let seconds = parseInt(document.getElementById("secs").value) || 0;

    let time = (hours * 3600) + (minutes * 60) + seconds;

    chrome.runtime.sendMessage({
        from: "popup",
        action: "start_timer",
        time: time
    });
};

chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.from === "background" && msg.action === "update_display") {
        let hours = Math.floor(msg.time / 3600);
        let minutes = Math.floor((msg.time % 3600) / 60);
        let seconds = msg.time % 60;

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdownElt.innerHTML = `${hours}:${minutes}:${seconds}`;
    }

    if (msg.from === "background" && msg.action === "time_up") {
        alert("Times up!");
    }
});

document.getElementById("Blocksite").onclick = function() {
    chrome.runtime.sendMessage({
        from: "popupblock"
    });
}

document.getElementById("Todolist").onclick = function() {
    chrome.runtime.sendMessage({
        from: "popuptodolist"
    });
}

document.getElementById("Breaktime").onclick = function() {
    chrome.runtime.sendMessage({
        from: "popupBreaktime"
    });
}