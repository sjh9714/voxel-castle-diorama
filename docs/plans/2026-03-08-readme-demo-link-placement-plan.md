# README Demo Link Placement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move the live demo link into the intro section of the README and remove the duplicate lower link.

**Architecture:** Keep the README structure intact but reposition the single GitHub Pages URL so it appears directly under the intro heading. Add one test that verifies the intro placement to keep the document layout stable.

**Tech Stack:** Markdown, Node test runner, Git

---

### Task 1: Lock the new README placement with a failing test

**Files:**
- Modify: `/Users/sungjh/castle/test/index.test.mjs`
- Reference: `/Users/sungjh/castle/README.md`

**Step 1: Write the failing test**

Add an assertion that the README contains:
- `## 소개`
- immediately followed by the demo link line
- and no longer contains `- 데모:` in the lower links list

**Step 2: Run the test to verify failure**

Run:

```bash
node --test /Users/sungjh/castle/test/index.test.mjs
```

Expected: the new placement assertion fails against the current README.

### Task 2: Implement the minimal README update

**Files:**
- Modify: `/Users/sungjh/castle/README.md`

**Step 1: Move the demo line**

Place the demo URL directly under `## 소개`.

**Step 2: Remove duplication**

Delete the lower `- 데모:` bullet from the `## 링크` section.

### Task 3: Verify and publish

**Files:**
- Modify: `/Users/sungjh/castle/README.md`
- Modify: `/Users/sungjh/castle/test/index.test.mjs`

**Step 1: Re-run the tests**

Run:

```bash
node --test /Users/sungjh/castle/test/index.test.mjs
```

Expected: all tests pass.

**Step 2: Commit and push**

Run:

```bash
git add README.md test/index.test.mjs docs/plans/2026-03-08-readme-demo-link-placement-design.md docs/plans/2026-03-08-readme-demo-link-placement-plan.md
git commit -m "docs: move demo link into intro"
git push origin main
```

Expected: remote `main` updates successfully.
