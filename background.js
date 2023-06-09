function storyViewed(friendId) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon48.png",
        title: "Story Viewer",
        message: `Your story has been viewed by user with ID: ${friendId}`,
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "storyViewed") {
        const friendId = request.friendId;
        storyViewed(friendId);
    }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (namespace === "sync" && "fbId" in changes) {
        const newFbId = changes.fbId.newValue;
        if (newFbId) {
            storyViewed(newFbId);
        }
    }
});