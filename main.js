const classname = "no-caps-addon-activated";

const initialize = ([{ urls }, { listType }]) => {
  let inList = 0;
  // If urls is empty there is no url blocked
  if (urls && urls.length) {
    for (let url of urls) {
      let expression = new RegExp(url.replace("*", "[^ ]*"));
      const result = location.host.match(expression);

      // Break the loop if the current host matches one of the patterns
      if (result && result.length) {
        inList = 1;
        break;
      }
    }
  }

  // if blocklist && not in list
  // if allowlist && in list
  if (inList === listType) {
    document.documentElement.classList.add(classname);

    // Set the title to lowercase
    document.title = document.title.toLowerCase();
  }
};
let urls = browser.storage.local.get("urls");
let listType = browser.storage.local.get("listType");

Promise.all([urls, listType]).then(initialize);
