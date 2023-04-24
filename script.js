
window.onload = () => {
  windowFlag = true;
  setTimeout(initFavButton, 1000);
}

// document.addEventListener("click", function(event) {
//   if (event.target.matches(".ams.bkH")) { // reply button clicked
//     // showGPTModal();
//     windowFlag = true;
//     setTimeout(initFavButton, 1000);
//   }
// });

const initFavButton = () => {

  // check the user is available 
  const hotSortbutton = document.querySelectorAll('[title="Sort by Hot"]');
  if (hotSortbutton.length > 0) {

    // get event when the content change using ajax
    const observer = new MutationObserver(event_Container);
    const gridParent = document.querySelector('#app-root');
    const contentElement = gridParent.parentElement;
    observer.observe(contentElement, { childList: true, subtree: true });

    // draw favorite button
    const gridElements = document.querySelectorAll('[role="grid"] .grid.relative');
    gridElements.forEach((gridElement) => {
      const childElement = document.createElement('div');

      childElement.classList.add("fav-panel")
      const imageUrl = chrome.runtime.getURL('icons/32.png');

      const button = document.createElement('div');
      button.classList.add('fav-button');
      button.setAttribute('style', `background-image:url("${imageUrl}")`);


      button.addEventListener('click', function (event) {
        // Replace misspelled word with suggestion
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://www.midjourney.com/api/app/user-rank/');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
          if (xhr.status === 200) {
            console.log(xhr.responseText);
          } else {
            console.error(xhr.statusText);
          }
        };
        const data = {
          jobId: "c655e4d9-43fd-4b2e-8396-477f452ef950",
          value: 4
        };
        xhr.send(JSON.stringify(data));

      });

      gridElement.appendChild(childElement);
      childElement.appendChild(button);
    });
  }

}

function event_Container(mutations) {
  const gridElements = document.querySelectorAll('[role="grid"] .grid.relative');
  gridElements.forEach((gridElement) => {
    const favButton = gridElement.querySelector('.fav-panel');
    if (!favButton) {
      const childElement = document.createElement('div');

      childElement.classList.add("fav-panel")
      const imageUrl = chrome.runtime.getURL('icons/32.png');
      childElement.innerHTML = `<div class='fav-button' id="headlessui-menu-item-15" style='background-image:url("${imageUrl}")'></div>`
      gridElement.appendChild(childElement);
    }
  });
}


const renderFavButton = () => {

}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "iconClicked") {

  }
});

