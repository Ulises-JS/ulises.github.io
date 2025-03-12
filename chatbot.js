document.addEventListener("DOMContentLoaded", () => {
  const dfMessenger = document.querySelector("df-messenger");
  const openButton = document.querySelector(".chatbot-open");
  openButton.addEventListener("click", () => {
    dfMessenger.style.display = "block";
    openButton.style.display = "none";
  });
  dfMessenger.addEventListener("df-messenger-loaded", () => {
    const closeButton = dfMessenger.shadowRoot.querySelector(".df-messenger-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        dfMessenger.style.display = "none";
        openButton.style.display = "block";
      });
    }
  });
});
