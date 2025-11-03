(function () {
  function insertGiscus() {
    // avoid duplicates
    if (document.getElementById("giscus_container")) return;
    

    const container = document.createElement("div");
    container.id = "giscus_container";

    // Make container occupy middle 50% of the width
    container.style.maxWidth = "75%";
    container.style.margin = "0 auto";

    // place it inside main.content or fallback to body set target by classnames: article-grid subgrid-gap col-screen article content
    let target = document.getElementsByClassName("article-grid subgrid-gap col-screen article content")[0];
    
    target.appendChild(container);

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

    container.appendChild(script);
    console.log("💬 Giscus injected.");
  }

  // Run once at first load with 2 second delay to ensure DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(insertGiscus, 2000);
  });

})();