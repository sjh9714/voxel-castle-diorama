# README Hero Image Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a hero screenshot to the top of the Korean portfolio README using a clean tracked asset path.

**Architecture:** Keep the existing README structure and insert a single representative image directly under the project title. Copy the screenshot to a stable ASCII filename inside the tracked `image/` directory so the Markdown link renders reliably on GitHub.

**Tech Stack:** Markdown, Git, GitHub

---

### Task 1: Add the tracked image asset

**Files:**
- Create: `/Users/sungjh/castle/image/castle-overview.png`
- Reference: `/Users/sungjh/castle/image/Screenshot 2026-03-08 at 2.23.51 AM.png`

**Step 1: Copy the screenshot to a clean path**

Run:

```bash
cp "/Users/sungjh/castle/image/Screenshot 2026-03-08 at 2.23.51 AM.png" /Users/sungjh/castle/image/castle-overview.png
```

Expected: the new image file exists at the destination path.

**Step 2: Verify the copied file**

Run:

```bash
ls -l /Users/sungjh/castle/image/castle-overview.png
```

Expected: file metadata prints with a non-zero size.

### Task 2: Update the README

**Files:**
- Modify: `/Users/sungjh/castle/README.md`

**Step 1: Insert the hero image**

Add a Markdown image line directly below the title:

```md
![Voxel Castle Diorama 대표 이미지](image/castle-overview.png)
```

**Step 2: Keep the copy concise**

Preserve the existing portfolio-oriented structure and only make small text adjustments if needed.

### Task 3: Verify and publish

**Files:**
- Modify: `/Users/sungjh/castle/README.md`
- Create: `/Users/sungjh/castle/image/castle-overview.png`

**Step 1: Review the README output**

Run:

```bash
sed -n '1,80p' /Users/sungjh/castle/README.md
```

Expected: the image line appears right below the title.

**Step 2: Check repository changes**

Run:

```bash
git status --short --branch
```

Expected: only the new image, README update, and planning docs appear.

**Step 3: Commit**

Run:

```bash
git add README.md image/castle-overview.png docs/plans/2026-03-08-readme-hero-image-design.md docs/plans/2026-03-08-readme-hero-image-plan.md
git commit -m "docs: add readme hero image"
```

**Step 4: Push**

Run:

```bash
git push origin main
```

Expected: remote `main` updates successfully.
