"use strict";

const copyEmailButton = document.querySelector(".copy-email");
const copyEmailStatus = document.getElementById("copy-email-status");
const emailAddress = document.querySelector(".email-address");

if (copyEmailButton && copyEmailStatus && emailAddress) {
  copyEmailButton.hidden = false;
  copyEmailButton.addEventListener("click", async () => {
    const email = emailAddress.textContent.trim();
    const manualCopyMessage = "Automatic copying is unavailable. Please select and copy the email address above.";

    copyEmailStatus.textContent = "";
    if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
      copyEmailStatus.textContent = manualCopyMessage;
      return;
    }

    copyEmailButton.disabled = true;
    try {
      await navigator.clipboard.writeText(email);
      copyEmailStatus.textContent = "Email address copied.";
    } catch {
      copyEmailStatus.textContent = manualCopyMessage;
    } finally {
      copyEmailButton.disabled = false;
    }
  });
}
