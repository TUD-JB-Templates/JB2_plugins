console.log("Wizard Injector 2000 active.");
console.log("url contains 'editor' =", window.location.href.includes("editor"));
let addWizard = function() {
    // 1. Target the main article container
    // In MyST-theme, this is usually 'main' or a specific div
    const container = document.querySelector('article') || document.body; 

    // 2. Identify the elements we MUST keep
    const footerLinks = container.querySelector('.myst-footer-links');
    const giscus = document.getElementById('giscus_container');

    // 3. Create the Editor Placeholder
    const editorPlaceholder = document.createElement('div');
    editorPlaceholder.id = 'wizard-root'; // Your React app will mount here
    editorPlaceholder.innerHTML = '<div style="padding: 40px; border: 2px dashed #ccc; text-align: center;">editor goes here</div>';

    // 4. Clear the container safely
    // We iterate backwards to avoid index shift issues while removing
    const children = Array.from(container.children);
    
    children.forEach(child => {
        // Check if this child is one of our protected elements
        // or contains them (important if giscus is nested)
        if (child === footerLinks || child === giscus || child.contains(giscus)) {
            return; // Skip removal
        }
        
        // Remove everything else
        container.removeChild(child);
    });

    // 5. Insert the editor at the top
    container.prepend(editorPlaceholder);
}

// Run once at first load with 2 second delay to ensure DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(addWizard, 2000);
  });