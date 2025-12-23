console.log("Wizard Injector 2000 active.");

const addWizard = function() {
    console.log("--- Wizard Debug Info ---");
    
    // 1. Target the main article container
    const container = document.querySelector('article') || document.body; 

    // 2. Metadata Parsing
    const repoAnchor = document.querySelector('a[title*="GitHub Repository:"]');
    const fileAnchor = document.querySelector('a[title="Edit This Page"]');

    if (!repoAnchor || !fileAnchor) {
        console.warn("❌ Metadata anchors not found. Aborting injection.");
        console.log("Repo Anchor Found:", !!repoAnchor);
        console.log("File Anchor Found:", !!fileAnchor);
        return;
    }

    // Parse Owner and Repo
    const repoMatch = repoAnchor.href.match(/github\.com\/([^/]+)\/([^/]+)/);
    let owner = "unknown";
    let repo = "unknown";
    
    if (repoMatch) {
        owner = repoMatch[1];
        repo = repoMatch[2];
    }

    // Parse File Path
    const fileUrlParts = fileAnchor.href.split('/edit/');
    let filePath = "not found";
    if (fileUrlParts.length > 1) {
        // Skips branch name to get the path
        filePath = fileUrlParts[1].split('/').slice(1).join('/');
    }

    // --- LOGGING THE DATA ---
    console.log("Owner:", owner);
    console.log("Repo:", repo);
    console.log("File Path:", filePath);
    console.log("Full Edit URL:", fileAnchor.href);
    console.log("--------------------------");

    // 3. Construct Iframe
    const iframeBase = "https://luukfroling.github.io/Wizard-jb2/";
    const finalUrl = `${iframeBase}?owner=${owner}&repo=${repo}&file=${filePath}`;
    
    console.log("Generated Iframe URL:", finalUrl);

    const iframe = document.createElement('iframe');
    iframe.src = finalUrl;
    iframe.style.width = "100%";
    iframe.style.height = "800px";
    iframe.style.border = "none";
    iframe.style.borderRadius = "8px";

    // 4. Identify elements to protect
    const footerLinks = container.querySelector('.myst-footer-links');
    const giscus = document.getElementById('giscus_container');

    // 5. Clear container safely
    const children = Array.from(container.children);
    children.forEach(child => {
        if (child === footerLinks || child === giscus || (giscus && child.contains(giscus))) {
            return; 
        }
        container.removeChild(child);
    });

    // 6. Inject Iframe at the top
    container.prepend(iframe);
    window.scrollTo(0, 0); // Jump to top so user sees the editor immediately
    
    console.log("✅ Wizard Iframe successfully injected.");
};

// Check if we should run
if (window.location.href.includes("editor") || window.location.search.includes("wizard=true")) {
    console.log("Editor mode detected. Waiting 2 seconds for MyST to settle...");
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(addWizard, 2000);
    });
}