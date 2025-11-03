(function () {
  function insertGiscus() {
    // avoid duplicates
    if (document.getElementById("giscus_container")) return;

    const container = document.createElement("div");
    container.id = "giscus_container";
    container.style.marginTop = "2rem";

    // place it inside main.content or fallback to body
    const target = document.querySelector("main.content") || document.body;
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

  // Run once at first load
  document.addEventListener("DOMContentLoaded", insertGiscus);

  // MyST Book uses PJAX-style navigation events
  document.addEventListener("pjax:complete", insertGiscus);
  document.addEventListener("sphinx-content-loaded", insertGiscus);

  // As a last resort, recheck periodically for deletions
//   setInterval(() => {
//     if (!document.getElementById("giscus_container")) insertGiscus();
//   }, 3000);
})();