const classname = "no-caps-addon-activated";

function onError(error) {
  console.log(`Error: ${error}`);
}

function initialize(item) {
  // If item is empty there is no url blocked
  if (item.urls && item.urls.length) {
    for (let url of item.urls) {
      let expression = new RegExp(url.replace("*", "[^ ]*"));
      const result = location.host.match(expression);

      // Exit the function if the current host matches one of the patterns
      if (result && result.length) {
        return;
      }
    }
  }

  document.documentElement.classList.add(classname);

  // Set the title to lowercase
  document.title = document.title.toLowerCase();
}

browser.storage.local.get("urls").then(initialize, onError);
