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
console.log(settingList)


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
                // Set toggles to current site settings
                document.getElementById(settingList).checked = (setting === "allow" || setting === "session_only"),
                console.log({ url, setting, details });
            },
        );
        });
    })
})


// Listen for a changing setting value
settingList.forEach((setting) => document.getElementById(setting).onchange = function() {
    // Block given setting if display changes to false
    if (document.getElementById(setting).checked == false) {
        chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
            activeTab = tabs[0];
            let url = new URL(activeTab.url);
            let urlOrigin = (url.origin + "/*")
            console.log(urlOrigin)
            chrome.contentSettings[setting].set({
                primaryPattern: urlOrigin,
                setting: "block"
            });
            chrome.tabs.reload();
        });
    };
    // Allow given setting if display changes to true
    if (document.getElementById(setting).checked == true) {
        chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
            activeTab = tabs[0];
            let url = new URL(activeTab.url);
            let urlOrigin = (url.origin + "/*")
            console.log(urlOrigin)
            chrome.contentSettings[setting].set({
                primaryPattern: urlOrigin,
                setting: "allow"
            });
            chrome.tabs.reload();
        });
    };
});

// Display the tab's URL at the top of the extension window
chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
    activeTab = tabs[0];
    let url = new URL(activeTab.url);
    document.getElementById("siteURL").innerHTML = url.origin
});
