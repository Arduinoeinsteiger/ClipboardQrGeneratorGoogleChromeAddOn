// Background script for the extension
// This script runs as a service worker in the background

// Listen for installation event
chrome.runtime.onInstalled.addListener(function() {
  console.log('Clipboard to QR Code extension installed');
});

// Handle messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "readClipboard") {
    // Attempt to read from clipboard
    navigator.clipboard.readText()
      .then(text => {
        sendResponse({success: true, text: text});
      })
      .catch(error => {
        // In case of error, provide a friendly error message
        let errorMessage = error.message;
        
        // Add more detailed explanation for common errors
        if (errorMessage.includes("Document is not focused")) {
          errorMessage = "Browser security requires that you interact with the extension before accessing clipboard. Try clicking inside the popup first.";
        } else if (errorMessage.includes("Not allowed")) {
          errorMessage = "Permission denied. Please allow clipboard access in Chrome settings.";
        }
        
        sendResponse({success: false, error: errorMessage});
      });
    return true; // Required for async sendResponse
  }
  
  if (message.action === "writeClipboard") {
    if (message.imageBlob) {
      try {
        // Create a ClipboardItem for the image
        const clipboardItem = new ClipboardItem({
          [message.imageBlob.type]: message.imageBlob
        });
        
        // Write to clipboard
        navigator.clipboard.write([clipboardItem])
          .then(() => {
            sendResponse({success: true});
          })
          .catch(error => {
            // In case of error, provide a friendly error message
            let errorMessage = error.message;
            
            // Add more detailed explanation for common errors
            if (errorMessage.includes("Document is not focused")) {
              errorMessage = "Browser security requires that you interact with the extension before accessing clipboard. Try clicking inside the popup first.";
            } else if (errorMessage.includes("Not allowed")) {
              errorMessage = "Permission denied. Please allow clipboard access in Chrome settings.";
            }
            
            sendResponse({success: false, error: errorMessage});
          });
      } catch (error) {
        sendResponse({success: false, error: error.message});
      }
      return true; // Required for async sendResponse
    }
  }
});
