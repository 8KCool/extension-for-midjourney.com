
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

    // checkFavState return value- 1: added already, 0: empty added
    if (checkFavState(gridElement)) {
      decrementFavImage(jobId, (result) => {
        drawHeartIcon(0, gridElement); // remove Icon
      });
    }
    else {
      incrementFavImage(jobId, (result) => {
        if (result == 1) {
          drawHeartIcon(1, gridElement); // draw Icon
        }
        else {
          console.log(result.error);
        }
      });

    }
    event.stopImmediatePropagation();
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

const checkFavState = (gridElement) => {
  const parentElement = gridElement.parentNode;
  if (!parentElement) return false;

  if (parentElement.querySelector("#Heart"))
    return true;
  return false;
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
    }
  }
  xhr.open("GET", url);
  xhr.send(null);
}

const drawHeartIcon = (state, gridElement) => {
  const parentElement = gridElement.parentNode;
  if (!parentElement) return;
  const heartParentElement = parentElement.querySelector(".absolute.justify-end.items-end.max-h-full.rounded-xl.cursor-pointer");
  if (state) { // draw
    if (heartParentElement) {
      if (heartParentElement.querySelector(".absolute.bottom-0 .items-stretch")) { // if there is any other badge? 
        var tag = heartParentElement.querySelector(".absolute.bottom-0 .items-stretch");
        tag.innerHTML = '<div class="flex aspect-square h-4 w-4 shrink-0 items-center justify-center"><svg height="14" class="inline-block -mt-0.5 text-rose-500" width="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg"> <g id="Heart"><path fill-rule="evenodd" clip-rule="evenodd"  d="M13.1027 2.69607C14.1724 2.17246 15.1056 2 16.5532 2.00002C20.2579 2.01536 23 5.13984 23 9.11988C23 12.1578 21.3062 15.0923 18.1512 17.9299C16.4951 19.4193 14.3807 20.8933 12.8664 21.6775L12 22.1261L11.1336 21.6775C9.61932 20.8933 7.50489 19.4193 5.84884 17.9299C2.69383 15.0923 1 12.1578 1 9.11988C1 5.09727 3.71644 2 7.45455 2C8.85028 2 9.83132 2.18878 10.9218 2.72813C11.3015 2.91592 11.6582 3.13866 11.99 3.39576C12.335 3.12339 12.7066 2.88993 13.1027 2.69607Z"></path>   </g>    </svg></div>' + tag.innerHTML;
      }
      else
        heartParentElement.innerHTML += '<div class="absolute bottom-0 translate-y-1/2 right-2 shrink-0 cursor-auto justify-self-end opacity-100"><div class="flex flex-col justify-between self-end text-orange-500 w-full text-base rounded-full bg-darkBlue-900  duration-150  transition-color border-darkBlue-900 border-[1px] px-0.5"> <div class="flex w-full min-w-max items-stretch justify-between gap-1 self-end p-1 text-base">  <div class="flex aspect-square h-4 w-4 shrink-0 items-center justify-center"><svg height="14" class="inline-block -mt-0.5 text-rose-500" width="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg"> <g id="Heart">  <path fill-rule="evenodd" clip-rule="evenodd"d="M13.1027 2.69607C14.1724 2.17246 15.1056 2 16.5532 2.00002C20.2579 2.01536 23 5.13984 23 9.11988C23 12.1578 21.3062 15.0923 18.1512 17.9299C16.4951 19.4193 14.3807 20.8933 12.8664 21.6775L12 22.1261L11.1336 21.6775C9.61932 20.8933 7.50489 19.4193 5.84884 17.9299C2.69383 15.0923 1 12.1578 1 9.11988C1 5.09727 3.71644 2 7.45455 2C8.85028 2 9.83132 2.18878 10.9218 2.72813C11.3015 2.91592 11.6582 3.13866 11.99 3.39576C12.335 3.12339 12.7066 2.88993 13.1027 2.69607Z">  </path> </g></svg></div> </div></div>  </div>';
    }
  }
  else { // remove
    if (heartParentElement) {
      if (heartParentElement.querySelector(".absolute.bottom-0")) { // if there is any other badge? 
        parentElement.querySelector("#Heart").parentNode.parentNode.remove();
      }
      else {
        heartParentElement.innerHTML = '<div class="absolute inset-0 h-full w-full"></div>';
      }
    }
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "iconClicked") {

  }
});

