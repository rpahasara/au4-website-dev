# Contributing to the AU4 Labs Website

## Standard Workflow

Always begin with the latest main branch:

    git checkout main
    git pull origin main

Create a new branch:

    git checkout -b feature/short-description

Make and test your changes locally.

Then run:

    git add .
    git status
    git commit -m "Clear description of change"
    git push -u origin feature/short-description

Create a Pull Request into `main`.

## Before Opening a Pull Request

Check that:

- The website loads locally.
- No broken links were introduced.
- There are no browser console errors.
- Desktop layout works.
- Mobile layout works.
- No credentials or secrets are included.
- No unsupported public claims were introduced.
- The approved AU4 Labs visual system is preserved.

## Commit Messages

Use clear commit messages such as:

    Add contact form backend
    Improve Open Graph metadata
    Fix mobile navigation spacing
    Add AI automation insight
    Configure production security headers

Avoid vague messages such as update, changes, fix stuff, or final-final.

## Main Branch

`main` represents the approved AU4 Labs website.

Use feature branches and Pull Requests for new work rather than developing unfinished changes directly on main.
