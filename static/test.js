// log hello world once document is loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log("Hello, World!");
});

(function () {
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
  document.head.appendChild(script);
})();
