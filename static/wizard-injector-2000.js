console.log("Wizard Injector 2000 active.");

const queryString = window.location.search;

// Create a URLSearchParams object
const urlParams = new URLSearchParams(queryString);

// Get the value of a specific parameter
const isEditor = urlParams.get('editor');

console.log(`Editor parameter value: ${isEditor}`);