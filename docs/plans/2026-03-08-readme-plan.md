# Portfolio README Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a concise Korean README that presents the voxel castle project as a portfolio piece.

**Architecture:** Keep the repository structure unchanged and add a single `README.md` at the repo root. The document should describe the project in Korean with a short intro, practical highlights, controls, local run instructions, and project links.

**Tech Stack:** Markdown, Git, GitHub

---

### Task 1: Add the README draft

**Files:**
- Create: `/Users/sungjh/castle/README.md`
- Reference: `/Users/sungjh/castle/index.html`

**Step 1: Draft the README sections**

Write short Korean copy for:
- project title
- one-line summary
- key features
- controls
- local run instructions
- tech stack
- links

**Step 2: Save the first version**

Use `apply_patch` to create `/Users/sungjh/castle/README.md`.

**Step 3: Review tone**

Check that the wording reads like a portfolio README rather than release notes or marketing copy.

### Task 2: Verify and publish

**Files:**
- Modify: `/Users/sungjh/castle/README.md`
- Test: `/Users/sungjh/castle/test/index.test.mjs`

**Step 1: Verify repository state**

Run:

```bash
node --test /Users/sungjh/castle/test/index.test.mjs
```

Expected: `6` tests pass and `0` tests fail.

**Step 2: Review the README diff**

Run:

```bash
git diff -- README.md docs/plans/2026-03-08-readme-design.md docs/plans/2026-03-08-readme-plan.md
```

Expected: only the new README and planning docs appear.

**Step 3: Commit**

Run:

```bash
git add README.md docs/plans/2026-03-08-readme-design.md docs/plans/2026-03-08-readme-plan.md
git commit -m "docs: add portfolio readme"
```

**Step 4: Push**

Run:

```bash
git push origin main
```

Expected: remote `main` updates successfully.
