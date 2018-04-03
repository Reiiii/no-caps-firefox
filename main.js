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

  // Create a new style element
  let css = document.createElement("style");
  css.type = "text/css";
  // Add our CSS
  css.innerHTML = `* {
    text-transform: lowercase !important;
  }`;
  document.head.appendChild(css);

  // Set the title to lowercase
  document.title = document.title.toLowerCase();
}

browser.storage.local.get("urls").then(initialize, onError);
