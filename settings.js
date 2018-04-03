function saveSettings(e) {
  e.preventDefault();
  let urls = document.querySelector("#urlList").value.split("\n");

  browser.storage.local.set({
    // Remove empty lines
    urls: urls.filter(e => e)
  });
}

function restoreSettings() {
  function setCurrentChoice(result) {
    document.querySelector("#urlList").value = result.urls
      ? result.urls.join("\n")
      : "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("urls");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreSettings);
document.querySelector("form").addEventListener("submit", saveSettings);
