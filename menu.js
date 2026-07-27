document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cookieSetting").checked = true
    chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
        activeTab = tabs[0];
        let url = activeTab.url
        chrome.contentSettings.cookies.get(
            {primaryUrl: url}, function (details) {
                document.getElementById("cookieSetting").checked = details.setting
            }
        );
    })
})