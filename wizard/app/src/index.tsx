/* @refresh reload */
import { Suspense } from "solid-js";
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import {
  getRepositoryLink,
  getCurrentFileHref,
  parseOwnerRepoFromHref,
} from "./lib/github/GithubUtility";
import { github } from "./lib/github/githubInteraction";
import { saveEditorContentToDatabase } from "./components/Editor";

// 1. Wrap everything in a named function
window.initWizard = () => {
  const root = document.getElementById("wizard-root");

  if (!(root instanceof HTMLElement)) {
    console.error("Wizard: #wizard-root not found in DOM.");
    return;
  }

  // Initialise github info
  const ref = getRepositoryLink();
  getCurrentFileHref();

  if (ref != null) {
    const ownerRepo = parseOwnerRepoFromHref(ref);
    if (ownerRepo != undefined) {
      github.setRepo(ownerRepo.repo);
      github.setOwner(ownerRepo.owner);
    } else {
      console.warn("Database not initialised - failed to parse href.");
      github.setRepo("repo");
      github.setBranch("branch");
      github.setOwner("owner");
    }
  } else {
    console.warn("Database not initialised - no github repo link found.");
    github.setRepo("repo");
    github.setBranch("branch");
    github.setOwner("owner");
  }

  window.addEventListener("beforeunload", async () => {
    await saveEditorContentToDatabase();
  });

  // 2. Return the disposer (optional, but good practice in Solid)
  return render(
    () => (
      <Suspense>
        <App />
      </Suspense>
    ),
    root,
  );
};