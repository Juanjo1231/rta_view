document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('rta2').onclick = () => {
    chrome.tabs.executeScript({
      file: 'js/jquery.js'
    }, function(){
      chrome.tabs.executeScript({
        file: 'js/rta_view_2.js'
      });
    })
  }

  document.getElementById('rta3').onclick = () => {
    chrome.tabs.executeScript({
      file: 'js/rta_view_3.js'
    });
  }

  document.getElementById('fossil').onclick = () => {
    chrome.tabs.executeScript({
      file: 'js/fossil_view.js'
    });
  }
})