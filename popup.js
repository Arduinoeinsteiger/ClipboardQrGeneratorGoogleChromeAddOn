document.addEventListener('DOMContentLoaded', function() {
  const getQrButton = document.getElementById('get-qr');
  const clipboardContentElement = document.getElementById('clipboard-content');
  const qrCodeElement = document.getElementById('qr-code');
  const statusMessageElement = document.getElementById('status-message');
  
  // Check clipboard content when popup opens
  readClipboard();
  
  // Add event listener to the Get QR button
  getQrButton.addEventListener('click', handleGetQr);
  
  // Function to read from clipboard (using background.js service worker)
  async function readClipboard() {
    try {
      // Use background script to read clipboard instead of direct access
      // This solves the "Document is not focused" error
      chrome.runtime.sendMessage({action: "readClipboard"}, function(response) {
        if (response && response.success) {
          const text = response.text;
          
          if (text) {
            clipboardContentElement.textContent = text.length > 100 
              ? text.substring(0, 100) + '...' 
              : text;
            
            // Store the full text in a data attribute for QR generation
            clipboardContentElement.dataset.fullText = text;
            
            showStatus('Clipboard content loaded successfully.', 'success');
          } else {
            clipboardContentElement.textContent = 'No text content in clipboard';
            showStatus('No text content found in clipboard.', 'error');
          }
        } else {
          const errorMsg = response ? response.error : 'Unknown error';
          console.error('Failed to read clipboard:', errorMsg);
          clipboardContentElement.textContent = 'Could not access clipboard';
          showStatus('Failed to access clipboard: ' + errorMsg, 'error');
        }
      });
    } catch (error) {
      console.error('Failed to read clipboard:', error);
      clipboardContentElement.textContent = 'Could not access clipboard';
      showStatus('Failed to access clipboard. Please check permissions.', 'error');
    }
  }
  
  // Function to handle Get QR button click
  async function handleGetQr() {
    const clipboardText = clipboardContentElement.dataset.fullText;
    
    if (!clipboardText) {
      showStatus('No text to convert. Copy some text first.', 'error');
      return;
    }
    
    try {
      // Generate QR code
      const qrCodeImage = generateQrCode(clipboardText);
      
      // Show QR code in UI
      qrCodeElement.innerHTML = '';
      qrCodeElement.appendChild(qrCodeImage);
      qrCodeElement.style.display = 'block';
      
      // Copy QR code to clipboard
      await copyQrCodeToClipboard(qrCodeImage);
      
      // Status message will be shown in copyQrCodeToClipboard function
    } catch (error) {
      console.error('Error generating QR code:', error);
      showStatus('Failed to generate QR code: ' + error.message, 'error');
    }
  }
  
  // Function to generate QR code
  function generateQrCode(text) {
    // Create QR code using qrcode-generator library
    const typeNumber = 0; // Auto-detect size
    const errorCorrectionLevel = 'L'; // Low error correction
    
    const qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(text);
    qr.make();
    
    // Create an image element from the QR code
    const img = document.createElement('img');
    img.src = qr.createDataURL(4); // Cell size 4
    
    return img;
  }
  
  // Function to copy QR code to clipboard
  async function copyQrCodeToClipboard(qrCodeImage) {
    try {
      // Create a canvas and draw the QR code image on it
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Wait for the image to load
      await new Promise((resolve) => {
        if (qrCodeImage.complete) {
          resolve();
        } else {
          qrCodeImage.onload = resolve;
        }
      });
      
      // Set canvas size to match the QR code image
      canvas.width = qrCodeImage.naturalWidth;
      canvas.height = qrCodeImage.naturalHeight;
      
      // Draw the image on the canvas
      ctx.drawImage(qrCodeImage, 0, 0);
      
      // Get the image data as a blob
      canvas.toBlob(async (blob) => {
        // Use background script to write to clipboard
        // This solves the "Document is not focused" error
        chrome.runtime.sendMessage(
          {
            action: "writeClipboard", 
            imageBlob: blob
          }, 
          function(response) {
            if (response && response.success) {
              showStatus('QR code copied to clipboard!', 'success');
            } else {
              const errorMsg = response ? response.error : 'Unknown error';
              console.error('Failed to copy QR code to clipboard:', errorMsg);
              showStatus('Failed to copy QR code to clipboard: ' + errorMsg, 'error');
            }
          }
        );
      }, 'image/png');
    } catch (error) {
      console.error('Error preparing image:', error);
      showStatus('Error preparing image: ' + error.message, 'error');
    }
  }
  
  // Function to show status messages
  function showStatus(message, type) {
    statusMessageElement.textContent = message;
    statusMessageElement.className = type;
    
    // Clear the message after 3 seconds
    setTimeout(() => {
      statusMessageElement.textContent = '';
      statusMessageElement.className = '';
    }, 3000);
  }
});
