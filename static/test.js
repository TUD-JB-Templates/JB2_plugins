// log hello world once document is loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log("Hello, World!");

  function insertGiscus() {
    // if giscus already exists, do nothing
    if (document.getElementById("giscus_container")) return;

    console.log("🔁 Adding Giscus...");
    const container = document.createElement("div");
    container.id = "giscus_container";
    document.body.appendChild(container);

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "TUD-JB-Templates/JB2_plugins");
    script.setAttribute("data-repo-id", "R_kgDOPrPv2Q");
    script.setAttribute("data-category", "Page comments");
    script.setAttribute("data-category-id", "DIC_kwDOPrPv2c4CxX_-");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    // Append the script *inside* the container
    container.appendChild(script);
  }

  // initial load
  insertGiscus();

  // watch for DOM changes and reinsert if needed
  const observer = new MutationObserver((mutations) => {
    const giscusExists = document.getElementById("giscus_container");
    if (!giscusExists) {
      insertGiscus();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("👀 Giscus watcher active");
});
