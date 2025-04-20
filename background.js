// Background script for the extension
// This script runs as a service worker in the background

// Listen for installation event
chrome.runtime.onInstalled.addListener(function() {
  console.log('Clipboard to QR Code extension installed');
});

// Since we're using Manifest V3, we need a service worker
// This minimal implementation just keeps the service worker alive
self.addEventListener('fetch', (event) => {
  // Service worker fetch handler is required for Manifest V3
  // but not needed for this extension's functionality
});
