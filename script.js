function generateQR() {
  const phone = document.getElementById('phone').value.trim();
  const message = encodeURIComponent(document.getElementById('message').value.trim());
  const qrContainer = document.getElementById('qrcode');
  const downloadLink = document.getElementById('downloadLink');

  if (!phone) return alert("Please enter a phone number.");

  const waLink = `https://wa.me/${phone}${message ? `?text=${message}` : ''}`;
  qrContainer.innerHTML = '';
  downloadLink.style.display = 'none';

  const logo = new Image();
  logo.crossOrigin = 'Anonymous';

  logo.onload = function() {
    // Logo loaded, now create QR code and draw logo
    QRCode.toCanvas(waLink, { width: 256, color: { dark: "#000000", light: "#ffffff" } }, function (err, canvas) {
      if (err) {
        console.error(err);
        return;
      }
      const ctx = canvas.getContext('2d');
      const size = 50;
      const x = (canvas.width - size) / 2;
      const y = (canvas.height - size) / 2;
      ctx.drawImage(logo, x, y, size, size);

      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.style.display = 'inline-block';
      qrContainer.appendChild(canvas);
    });
  };

  logo.onerror = function() {
    // Logo failed, create QR code without it
    console.error("Logo failed to load.");
    QRCode.toCanvas(waLink, { width: 256, color: { dark: "#000000", light: "#ffffff" } }, function (err, canvas) {
        if (err) {
            console.error(err);
            return;
        }
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.style.display = 'inline-block';
        qrContainer.appendChild(canvas);
    });
  };

  logo.src = 'whatsapp-logo.png'; // Start loading the image
}

document.getElementById('phone').addEventListener('input', () => {
    document.getElementById('qrcode').innerHTML = '';
    document.getElementById('downloadLink').style.display = 'none';
});

document.getElementById('message').addEventListener('input', () => {
    document.getElementById('qrcode').innerHTML = '';
    document.getElementById('downloadLink').style.display = 'none';
});
