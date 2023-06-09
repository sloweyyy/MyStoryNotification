function loadFacebookSDK() {
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.onload = function() {
        // Facebook SDK has been loaded, you can now make API calls
        FB.init({
            appId: "YOUR_APP_ID",
            version: "v12.0"
        });
    };
    document.head.appendChild(script);
}

function saveFriendId() {
    const friendIdInput = document.getElementById("fbIdInput");
    const friendId = friendIdInput.value.trim();

    if (friendId !== "") {
        FB.api(
            `/${friendId}`, { fields: 'id' },
            function(response) {
                if (response && !response.error) {
                    const friendId = response.id;
                    chrome.storage.sync.set({ fbId: friendId }, function() {
                        showNotification(friendId);
                    });
                } else {
                    console.error(response.error);
                }
            }
        );
    }
}


function getFriendName(friendId) {
    return fetch(`https://graph.facebook.com/${friendId}?fields=name&access_token=EAABsbCS1iHgBAM5V16ZAxgj4SgEN1n7zGQD4CGMspZAAlwStTABfz5VvUd4rWfZBoQn99nyFe0btJaJKVGdLOj3q0Ct4eO2vHEZC4rQvsLiIMjqZCnqBxZB2nNgZAR1ZBrvfcH0jJi4JBYBlH2ZCPpZCcUHPPzOW9jnvtSHJcJ6N6ZCRCfTnX5mKhoLZATKSmqd5EuMZD`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to get friend's name");
            }
        })
        .then(data => {
            const friendName = data.name;
            return friendName;
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}



function showNotification(friendName) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon48.png",
        title: "Story Viewer",
        message: `Your story has been viewed by your friend: ${friendName}`,
    });

}

document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", toggleDarkMode);
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}