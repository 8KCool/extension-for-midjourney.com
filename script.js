
window.onload = () => {
  setTimeout(initFavButton, 1000);
}

const initFavButton = () => {

  // check the user is available 
  if (checkUserLoggedIn()) {
    // get event when the content change using ajax
    const observer = new MutationObserver(event_Container);
    const gridParent = document.querySelector('#app-root');
    const contentElement = gridParent.parentElement;
    observer.observe(contentElement, { childList: true, subtree: true });

    // draw favorite button
    const gridElements = document.querySelectorAll('[role="grid"] .grid.relative');
    gridElements.forEach((gridElement) => {
      renderFavButton(gridElement);
    });
  }
}

const checkUserLoggedIn = () => {
  const hotSortbutton = document.querySelectorAll('[title="Sort by Hot"]');
  if (hotSortbutton.length > 0)
    return true;
  return false;
}

const renderFavButton = (gridElement) => {
  const childElement = document.createElement('div');
  childElement.classList.add("fav-panel")
  const imageUrl = chrome.runtime.getURL('icons/32.png');
  const button = document.createElement('div');
  button.classList.add('fav-button');
  button.setAttribute('style', `background-image:url("${imageUrl}")`);
  gridElement.appendChild(childElement);
  childElement.appendChild(button);

  let jobId = getJobId(gridElement);

  // init add fav function
  button.addEventListener('click', function (event) {
    event.preventDefault();

    incrementFavImage(jobId, (result) => {

    });

    decrementFavImage(jobId, (result) => {

    });
  });
}

const getJobId = (gridElement) => {
  if (!gridElement) return "";
  const jobImgTag = gridElement.querySelector(".aspect-auto.rendering-contrast");
  if (jobImgTag) {
    return jobImgTag.getAttribute("data-job-id");
  }

  return "";
}

const incrementFavImage = (jobId, callback) => {
  var url = `https://www.midjourney.com/api/app/user-like/?jobId=${jobId}&value=increment`;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response);
      callback(response)
    } else {
      console.log(xhr.statusText);
      callback("error");
    }
  }
  xhr.open("GET", url);
  xhr.send(null);
}

const decrementFavImage = (jobId, callback) => {
  var url = `https://www.midjourney.com/api/app/user-like/?jobId=${jobId}&value=decrement`;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response);
      callback(response)
    } else {
      console.log(xhr.statusText);
      callback("error");
    }
  }
  xhr.open("GET", url);
  xhr.send(null);
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "iconClicked") {

  }
});

