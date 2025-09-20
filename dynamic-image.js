

/* 
document.addEventListener('DOMContentLoaded', function() {
  const imageUpload = document.getElementById('image-upload');
  const profileImage = document.getElementById('profile-image');
  const imageOverlay = document.getElementById('image-overlay');
  const maxFileSize = 2 * 1024 * 1024; // 2MB limit

  // Load saved image from localStorage if available
  if (localStorage.getItem('profileImage')) {
    profileImage.src = localStorage.getItem('profileImage');
  }

  // Trigger file input on image overlay click
  if (imageOverlay) {
    imageOverlay.addEventListener('click', () => {
      imageUpload.click();
    });
  }

  if (imageUpload) {
    imageUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file (e.g., JPG, PNG).');
        imageUpload.value = ''; // Clear input
        return;
      }
      if (file.size > maxFileSize) {
        alert('File size exceeds 2MB. Please upload a smaller image.');
        imageUpload.value = '';
        return;
      }

      // Show loading state
      profileImage.style.opacity = '0.5';

      const reader = new FileReader();
      reader.onload = function(event) {
        const imageData = event.target.result;
        // Create an image element to check dimensions
        const img = new Image();
        img.onload = function() {
          profileImage.src = imageData;
          profileImage.style.opacity = '1';
          localStorage.setItem('profileImage', imageData); // Save to localStorage
        };
        img.onerror = function() {
          alert('Error loading the image. Please try again.');
          profileImage.src = localStorage.getItem('profileImage') || 'assets/profile.jpg';
          profileImage.style.opacity = '1';
        };
        img.src = imageData;
      };
      reader.onerror = function() {
        alert('Error reading the file. Please try again.');
        profileImage.src = localStorage.getItem('profileImage') || 'assets/profile.jpg';
        profileImage.style.opacity = '1';
      };
      reader.readAsDataURL(file);
    });
  }
});
*/