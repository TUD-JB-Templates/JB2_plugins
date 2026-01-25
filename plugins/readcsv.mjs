// plugin.mjs
import yaml from "js-yaml";

function getFrontmatterFromMdast(mdast) {
  if (!mdast?.children) return null;
  const yamlNode = mdast.children.find((n) => n.type === "yaml");
  if (!yamlNode || typeof yamlNode.value !== "string") return null;
  try {
    return yaml.load(yamlNode.value);
  } catch (err) {
    console.warn("[TitlePlugin] YAML parse error:", err.message);
    return null;
  }
}

function hasTitle(fm) {
  if (!fm) return false;
  return Object.prototype.hasOwnProperty.call(fm, "title");
}

function titleNoticeTransform(_opts, _utils) {
  return async (mdast) => {
    const fm = getFrontmatterFromMdast(mdast);
    if (!fm) {
      console.log("[TitlePlugin] Geen frontmatter gevonden");
      return mdast;
    }

    console.log("[TitlePlugin] Frontmatter:", fm);

    if (hasTitle(fm)) {
      console.log(`[TitlePlugin] ✅ Title gevonden: "${fm.title}"`);
      // Als je er ook iets in de output wil zetten:
      mdast.children ??= [];
      mdast.children.unshift({
        type: "paragraph",
        children: [{ type: "text", value: `Title gevonden: ${fm.title}` }],
      });
    } else {
      console.log("[TitlePlugin] ❌ Geen title key gevonden");
    }

    return mdast;
  };
}

const mystTitleNoticeTransform = {
  plugin: titleNoticeTransform,
  stage: "document",
};

const plugin = {
  name: "Title Detector",
  author: "you",
  license: "MIT",
  directives: [],
  roles: [],
  transforms: [mystTitleNoticeTransform],
};

export default plugin;
