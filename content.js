function checkStoryView() {
    const storyViewerSelector = "[data-testid='story-ring']"; // Selector để xác định vòng tròn story
    const storyViewerElement = document.querySelector(storyViewerSelector);

    if (storyViewerElement) {
        chrome.runtime.sendMessage({ action: "notify" });
    }
}



window.addEventListener("load", checkStoryView);
window.addEventListener("hashchange", checkStoryView);