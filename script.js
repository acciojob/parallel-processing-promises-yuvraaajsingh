const imageUrls = [
      "https://via.placeholder.com/200x150?text=Image+1",
      "https://via.placeholder.com/200x150?text=Image+2",
      "https://via.placeholder.com/200x150?text=Image+3"
      // Try adding a broken link to test error handling
      // "https://invalid-url.com/image.jpg"
    ];

    // Download a single image as a promise
    function downloadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image: ${url}`);
      });
    }

    async function downloadImages() {
      const loadingDiv = document.getElementById("loading");
      const errorDiv = document.getElementById("error");
      const outputDiv = document.getElementById("output");

      // Reset UI
      loadingDiv.style.display = "block";
      errorDiv.textContent = "";
      outputDiv.innerHTML = "";

      try {
        const imagePromises = imageUrls.map(url => downloadImage(url));
        const images = await Promise.all(imagePromises);

        images.forEach(img => outputDiv.appendChild(img));
      } catch (error) {
        errorDiv.textContent = error;
      } finally {
        loadingDiv.style.display = "none";
      }
    }

    // Start download on page load
    window.onload = downloadImages;