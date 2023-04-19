
window.onload = () => {
  windowFlag = true;  
    setTimeout(showFavButton, 1000);
}

// document.addEventListener("click", function(event) {
//   if (event.target.matches(".ams.bkH")) { // reply button clicked
//     // showGPTModal();
//     windowFlag = true;
//     setTimeout(showFavButton, 1000);
//   }
// });

const showFavButton = () => {
  const gridElements = document.querySelectorAll('[role="grid"] .relative');
  gridElements.forEach((gridElement) => {
    const childElement = document.createElement('div');

    childElement.classList.add("fav-panel")
    const imageUrl = chrome.runtime.getURL('icons/32.png');
    childElement.innerHTML = `<div class='fav-button' style='background-image:url("${imageUrl}")'></div>`
    gridElement.appendChild(childElement);
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "iconClicked") {
    
  }
});

