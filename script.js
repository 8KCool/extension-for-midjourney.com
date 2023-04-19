
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

  // check the user is available 
  const hotSortbutton = document.querySelectorAll('[title="Sort by Hot"]');
  if (hotSortbutton.length > 0) {

    // get event when the content change using ajax
    const observer = new MutationObserver(event_Container);
    const gridParent = document.querySelector('#app-root');
    const contentElement = gridParent.parentElement;
    observer.observe(contentElement, { childList: true, subtree: true });

    // draw favorite button
    const gridElements = document.querySelectorAll('[role="grid"] .relative');
    gridElements.forEach((gridElement) => {
      const childElement = document.createElement('div');

      childElement.classList.add("fav-panel")
      const imageUrl = chrome.runtime.getURL('icons/32.png');
      childElement.innerHTML = `<div class='fav-button' style='background-image:url("${imageUrl}")'></div>`
      gridElement.appendChild(childElement);
    });
  }

}

function event_Container(mutations) {
  const gridElements = document.querySelectorAll('[role="grid"] .relative');
  gridElements.forEach((gridElement) => {
    const favButton = gridElement.querySelector('.fav-panel');
    if (!favButton) {
      const childElement = document.createElement('div');

      childElement.classList.add("fav-panel")
      const imageUrl = chrome.runtime.getURL('icons/32.png');
      childElement.innerHTML = `<div class='fav-button' style='background-image:url("${imageUrl}")'></div>`
      gridElement.appendChild(childElement);
    }
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "iconClicked") {

  }
});

