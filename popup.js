document.addEventListener("DOMContentLoaded", function () {
  const savedSpeed = localStorage.getItem("lastSpeed");
  const inputField = document.getElementById("inputSpeed");
  if (savedSpeed) {
    inputField.value = savedSpeed;
  } else {
    inputField.value = 1; 
  }

  document.getElementById("speedButton").addEventListener("click", function () {
    const input = inputField.value;
    const speed = parseFloat(input);

    if (speed <= 0 || speed > 5 || isNaN(speed)) {
      alert("Please enter a valid speed between 0.1 and 5");
      return;
    }
    localStorage.setItem("lastSpeed", speed);

    inputField.value = speed;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (s) => {
          const videos = document.querySelectorAll("video");
          if (videos.length === 0) {
            alert("No video found.");
          } else {
            videos.forEach((video) => (video.playbackRate = s));
            alert(`Playback speed set to ${s}x`);
          }
        },
        args: [speed],
      });
    });
  });
});
