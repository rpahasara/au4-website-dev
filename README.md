# AU4 Labs Website

Official public website for AU4 Labs.

**Turn Friction Into Advantage.**

AU4 Labs is an engineering-led technology company combining:

- Product Engineering
- Cloud & DevOps
- Data & AI
- Cyber Security

to solve real business problems.

## Project Structure

The public website is located in `au4-site/`.

Main project areas:

- `au4-site/` — public website
- `au4-site/assets/` — website assets
- `au4-site/styles.css` — shared styles
- `au4-site/script.js` — shared interactions
- `docs/public-claims-register.md` — public claims and credibility register

## Run Locally

From the repository root:

    cd au4-site
    python -m http.server 8080

Then open:

    http://localhost:8080

## Git Workflow

Do not normally develop directly on `main`.

Start from the latest main branch:

    git checkout main
    git pull origin main
    git checkout -b feature/your-feature-name

After making changes:

    git add .
    git status
    git commit -m "Describe your change"
    git push -u origin feature/your-feature-name

Then create a Pull Request into `main`.

## Branch Naming

Examples:

    feature/contact-backend
    feature/seo
    feature/analytics
    feature/deployment
    content/new-insight
    fix/mobile-navigation

## Security

Never commit:

- `.env` files
- credentials
- API keys
- private keys
- customer data
- generated browser or QA artifacts
- local temporary files

Review `docs/public-claims-register.md` before adding public claims, metrics, customer references, certifications, partnerships, or similar statements.

## Project Status

Design and UX Phases 1-12 are complete.

Production-readiness engineering is the next stage.

Copyright 2026 AU4 Labs.
