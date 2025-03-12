// chatbot.js
document.addEventListener("DOMContentLoaded", () => {
  const dfMessenger = document.querySelector("df-messenger");
  const openButton = document.querySelector(".chatbot-open");

  // Show chatbot when toggle button is clicked
  openButton.addEventListener("click", () => {
    dfMessenger.style.display = "block";
    openButton.style.display = "none";
  });

  // Wait for Dialogflow Messenger to load, then attach close button listener
  dfMessenger.addEventListener("df-messenger-loaded", () => {
    const closeButton = dfMessenger.shadowRoot.querySelector(".df-messenger-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        dfMessenger.style.display = "none";
        openButton.style.display = "block";
        // Explicitly hide the minimized bubble
        const minimizedBubble = dfMessenger.shadowRoot.querySelector(".df-messenger-minimized");
        if (minimizedBubble) {
          minimizedBubble.style.display = "none";
        }
      });
    }
  });
});
