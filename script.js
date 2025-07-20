function generateQR() {
  const text = document.getElementById('qrText').value;
  const qrContainer = document.getElementById('qrcode');
  const downloadLink = document.getElementById('downloadLink');

  if (!text) return alert('Please enter a text or URL');

  qrContainer.innerHTML = ''; // Clear previous
  QRCode.toCanvas(text, { width: 256 }, function (err, canvas) {
    if (err) console.error(err);
    qrContainer.appendChild(canvas);

    // Convert canvas to image for download
    const imageURL = canvas.toDataURL("image/png");
    downloadLink.href = imageURL;
    downloadLink.style.display = 'inline-block';
    downloadLink.textContent = 'Download QR Code';
  });
}
