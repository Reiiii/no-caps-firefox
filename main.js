const classname = "no-caps-addon-activated";

// Restrict the amount of times the titleChange callback will be called
// This is to prevent an endless loop of title changes if the page itself
// also listens to title-changes to modify it.
// 100 title changes should be enough for most pages as most pages
// don't change the title that often
const maxTitleChanges = 100;
let titleChanges = 0;

const titleChangeCallback = mutations => {
  mutations.forEach(mutation => {
    // Prevent calling the callback when changing the title to lowercase
    if (
      titleChanges++ < maxTitleChanges &&
      mutation.target.textContent != mutation.target.textContent.toLowerCase()
    ) {
      document.title = document.title.toLowerCase();
    }
  });
};

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
  if (listType !== undefined ? inList === listType : !inList) {
    document.documentElement.classList.add(classname);

    // Set the title to lowercase
    document.title = document.title.toLowerCase();

    // Observe the title for changes
    const titleElement = document.getElementsByTagName("title")[0];

    const observer = new MutationObserver(titleChangeCallback);

    observer.observe(titleElement, {
      subtree: true,
      characterData: true,
      childList: true
    });
  }
};
let urls = browser.storage.local.get("urls");
let listType = browser.storage.local.get("listType");

Promise.all([urls, listType]).then(initialize);
