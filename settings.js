const saveSettings = e => {
  e.preventDefault();
  let urls = [];
  // 0 = Blocklist, 1 = allowlist
  let listType = 0;
  let data = new FormData(document.querySelector("form"));
  for (let entry of data) {
    switch (entry[0]) {
    case "urlList":
      urls = entry[1].split("\n");
      break;
    case "listType":
      listType = parseInt(entry[1]);
      break;
    }
  }

  browser.storage.local.set({
    // Remove empty lines
    urls: urls.filter(e => e),
    listType
  });
};

const restoreSettings = () => {
  const setUrls = urls => {
    document.querySelector("#urlList").value = urls ? urls.join("\n") : "";
  };

  const setListType = listType => {
    // Blocklist is checked by default
    if (listType === 1) {
      document.getElementById("allowlist").checked = true;
    }
  };

  let urls = browser.storage.local.get("urls");
  let listType = browser.storage.local.get("listType");
  Promise.all([urls, listType]).then(settings => {
    // Set the url-field
    setUrls(settings[0].urls);
    // Check the right box
    setListType(settings[1].listType);
  });
  // getting.then(setCurrentChoice, onError);
};

document.addEventListener("DOMContentLoaded", restoreSettings);
document.querySelector("form").addEventListener("submit", saveSettings);
