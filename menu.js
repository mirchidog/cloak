let settingList = [
    "cookies",
    "javascript",
    "popups",
    "camera",
    "microphone",
    "clipboard",
    "location",
    "notifications"
]
// Automatically toggle each setting.
function toggleAll(settingList) {
    document.getElementById(settingList).checked = true;
}


document.addEventListener("DOMContentLoaded", function() {
    settingList.forEach(toggleAll);
    // Return the current URL
    chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
        activeTab = tabs[0];
        var url = activeTab.url;
        // Lookup the current settings for given URL
        settingList.forEach(function(settingList) {
            chrome.contentSettings[settingList].get(
            {primaryUrl: url}, function (details) {
                let setting = details.setting;
                document.getElementById(settingList).checked = (setting === "allow" || setting === "session_only"),
                console.log({ url, setting, details });
            },
        );
        });
    })
})

function querySettings(settingList) {
    chrome.contentSettings[settingList].get(
            {primaryUrl: url}, function (details) {
                let setting = details.setting;
                document.getElementById(settingList).checked = (setting === "allow" || setting === "session_only"),
                console.log({ url, setting, details });
            },
        );
}




document.getElementById("javascript").onchange = function() {
    if (document.getElementById("javascript").checked == false) {
        chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
            activeTab = tabs[0];
            let url = new URL(activeTab.url);
            let urlOrigin = (url.origin + "/*")
            console.log(urlOrigin)
            chrome.contentSettings.javascript.set({
                primaryPattern: urlOrigin,
                setting: "block"
            });
            chrome.tabs.reload();
        });
    };
    if (document.getElementById("javascript").checked == true) {
        chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
            activeTab = tabs[0];
            let url = new URL(activeTab.url);
            let urlOrigin = (url.origin + "/*")
            console.log(urlOrigin)
            chrome.contentSettings.javascript.set({
                primaryPattern: urlOrigin,
                setting: "allow"
            });
            chrome.tabs.reload();
        });
    };
}
