# GitHub Pages Enablement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Publish the static castle demo on GitHub Pages and expose the live URL in the README.

**Architecture:** Keep hosting as a simple static site from the repository root. Add one repo-level deployment marker file, update the README to show the live URL, and configure GitHub Pages to publish from `main` at `/`.

**Tech Stack:** GitHub Pages, Markdown, GitHub CLI, Node test runner

---

### Task 1: Lock the repo-facing behavior with tests

**Files:**
- Modify: `/Users/sungjh/castle/test/index.test.mjs`
- Reference: `/Users/sungjh/castle/README.md`

**Step 1: Write the failing tests**

Add tests for:
- the README containing the GitHub Pages demo URL
- the repository containing a `.nojekyll` file

**Step 2: Run the tests to verify failure**

Run:

```bash
node --test /Users/sungjh/castle/test/index.test.mjs
```

Expected: at least one new test fails because the demo URL and `.nojekyll` marker do not exist yet.

### Task 2: Implement the minimal repo changes

**Files:**
- Modify: `/Users/sungjh/castle/README.md`
- Create: `/Users/sungjh/castle/.nojekyll`

**Step 1: Add the live demo link**

Add this URL to the README links section:

```text
https://jinhyuk9714.github.io/voxel-castle-diorama/
```

**Step 2: Add the no-Jekyll marker**

Create an empty `.nojekyll` file in the repo root.

### Task 3: Enable Pages and publish

**Files:**
- Modify: repository Pages settings via GitHub API

**Step 1: Enable GitHub Pages**

Run:

```bash
gh api --method POST repos/jinhyuk9714/voxel-castle-diorama/pages -f source[branch]=main -f source[path]=/
```

Expected: API returns the configured Pages site metadata.

**Step 2: Push repo changes**

Run:

```bash
git add README.md .nojekyll docs/plans/2026-03-08-github-pages-design.md docs/plans/2026-03-08-github-pages-plan.md test/index.test.mjs
git commit -m "docs: add GitHub Pages demo link"
git push origin main
```

Expected: `main` updates successfully.

### Task 4: Verify the result

**Files:**
- Modify: none

**Step 1: Re-run the tests**

Run:

```bash
node --test /Users/sungjh/castle/test/index.test.mjs
```

Expected: all tests pass.

**Step 2: Check Pages configuration**

Run:

```bash
gh api repos/jinhyuk9714/voxel-castle-diorama/pages
```

Expected: response includes `html_url` for the live site.

**Step 3: Check the live URL**

Run:

```bash
curl -I https://jinhyuk9714.github.io/voxel-castle-diorama/
```

Expected: HTTP success once deployment finishes.
