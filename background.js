let timeRemaining = 0;
let timer;

chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(["blocked", "enabled"], function (local) {
        if (!Array.isArray(local.blocked)) {
            chrome.storage.local.set({ blocked: [] });
        }

        if (typeof local.enabled !== "boolean") {
            chrome.storage.local.set({ enabled: false });
        }
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    const url = changeInfo.pendingUrl || changeInfo.url;
    if (!url || !url.startsWith("http")) {
        return;
    }

    const hostname = new URL(url).hostname;

    chrome.storage.local.get(["blocked", "enabled"], function (local) {
        const { blocked, enabled } = local;
        if (Array.isArray(blocked) && enabled && blocked.find(domain => hostname.includes(domain))) {
            chrome.tabs.remove(tabId);
        }
    });
});

var contentTabId;
var blockfhr, blockfmin, blockfsec;
var blockffourth, blockffifth, blockfsixth;
var alarmfhr, alarmfmin, alarmfsec;
var jwalit = 5;
var cur = false;
var alarmdate, alarmcurrenttime;
var alarmcurrenthr, alarmcurrentmin, alarmcurrentsec;

chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg.from === "content") {
        contentTabId = sender.tab.id;
    }

    if (msg.from === "popup" && msg.action === "start_timer") {
        if (timer) {
            clearInterval(timer);
        }

        timeRemaining = msg.time;

        timer = setInterval(function() {
            if (timeRemaining <= 0) {
                clearInterval(timer);
                chrome.runtime.sendMessage({
                    from: "background",
                    action: "time_up"
                });
                return;
            }

            timeRemaining--;

            chrome.runtime.sendMessage({
                from: "background",
                action: "update_display",
                time: timeRemaining
            });

        }, 1000);
    }

    if (msg.from === "breaktimer") {
        blockfhr = msg.firstelt;
        blockfmin = msg.secondelt;
        blockfsec = msg.thirdelt;
        blockffourth = msg.fourthelt;
        blockffifth = msg.fifthelt;
        blockfsixth = msg.sixthelt;
        jwalit = 1;
        cur = true;
    }

    if (msg.from === "alarmtimer") {
        alarmfhr = msg.firsteltala;
        alarmfmin = msg.secondeltala;
        alarmfsec = msg.thirdeltala;
    }
});

setInterval(updateCountdown, 1000);
window.hour = 0;
window.minutes = 0;
window.seconds = 0;

function updateCountdown() {
    alarmdate = new Date();
    alarmcurrenttime = alarmdate.toTimeString().split(" ")[0];
    alarmcurrenthr = alarmcurrenttime.split(":")[0];
    alarmcurrentmin = alarmcurrenttime.split(":")[1];
    alarmcurrentsec = alarmcurrenttime.split(":")[2];

    if (alarmcurrenthr == blockffourth && alarmcurrentmin == blockffifth && alarmcurrentsec == blockfsixth) {
        jwalit = 0;
        cur = false;
        alert("BREAK ENDED");
    }

    if (jwalit == 1 && alarmcurrenthr == blockfhr && alarmcurrentmin == blockfmin && alarmcurrentsec == blockfsec) {
        alert("BREAK STARTED");

        var kkobj;
        chrome.webRequest.onBeforeRequest.addListener(
            function(details) { return {cancel: cur}; },
            kkobj = { urls: [] },
            ["blocking"]
        );
    }

    if (alarmcurrenthr == alarmfhr && alarmcurrentmin == alarmfmin && alarmcurrentsec == alarmfsec) {
        alert("ALARM TIME OVER");
    }
}

chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg.from === "popupblock") {
        chrome.tabs.create({ url: chrome.extension.getURL('blockSite/option.html') });
    }
});

chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg.from === "popuptodolist") {
        chrome.tabs.create({ url: chrome.extension.getURL("to_do_list/todolisthtml.html") });
    }
});

chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg.from === "popupBreaktime") {
        chrome.tabs.create({ url: chrome.extension.getURL('break/break.html') });
    }
});
