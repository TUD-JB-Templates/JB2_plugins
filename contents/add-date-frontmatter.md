---
updated: October 7, 2025
date: 2021-02-20
description: hello
abstract: A test abstract
---

# Add date via frontmatter 

adds updated date from frontmatter above. 

requires custom css:

```css
#skip-to-frontmatter {
  margin-bottom: 0;
  order: -2; /* Keep the original date first */
}

.article.content.article-grid {
  display: grid;
}

.updated-date-container {
  order: -1; /* Move it visually below the date */
}
```

For future reference : the order determines wether the abstract (order 0, default) is shown first or the updated date (manually set order -1).

Testcase:

## First subtab

some text 

## Second subtab

some text