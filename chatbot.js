// chatbot.js
document.addEventListener("DOMContentLoaded", () => {
  const dfMessenger = document.querySelector("df-messenger");
  const openButton = document.querySelector(".chatbot-open");

  // Initial state: hide chatbot, show custom button
  dfMessenger.style.display = "none";
  openButton.style.display = "block";

  // Open chatbot fully on button click
  openButton.addEventListener("click", () => {
    console.log("Opening chatbot");
    dfMessenger.style.display = "block";
    openButton.style.display = "none";
    // Wait for the widget to render, then simulate a click on the minimized bubble
    setTimeout(() => {
      const minimizedBubble = dfMessenger.shadowRoot.querySelector(".df-messenger-minimized");
      if (minimizedBubble) {
        console.log("Simulating click on minimized bubble");
        minimizedBubble.click(); // Simulate click to open the full chat
      } else {
        console.log("Minimized bubble not found");
      }
    }, 500); // Small delay to ensure widget renders
  });

  // Handle close button
  dfMessenger.addEventListener("df-messenger-loaded", () => {
    console.log("Dialogflow loaded");
    const closeButton = dfMessenger.shadowRoot.querySelector(".df-messenger-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        console.log("Closing chatbot");
        dfMessenger.style.display = "none";
        openButton.style.display = "block";
        // Ensure minimized bubble stays hidden
        const minimizedBubble = dfMessenger.shadowRoot.querySelector(".df-messenger-minimized");
        if (minimizedBubble) {
          minimizedBubble.style.display = "none";
        }
      });
    }
  });

  // Fallback: hide minimized bubble if it appears
  const observer = new MutationObserver(() => {
    const minimizedBubble = dfMessenger.shadowRoot.querySelector(".df-messenger-minimized");
    if (minimizedBubble && minimizedBubble.style.display !== "none") {
      console.log("Minimized bubble detected—hiding it");
      minimizedBubble.style.display = "none";
    }
  });
  observer.observe(dfMessenger, { attributes: true, childList: true, subtree: true });
});
