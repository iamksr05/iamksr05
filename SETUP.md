# Karan / Cosmic profile

## Make it live

1. Unzip the folder.
2. Copy `README.md`, the entire `assets/` directory, and `.github/workflows/snake.yml` into the root of the public `iamksr05/iamksr05` repository. Replace existing files with the same names. Do not place the enclosing `iamksr05-main` folder inside the repository.
3. Commit to your default branch. The hero and both project cards use local, pre-rendered animated GIFs. No account, API key, or animation service is needed.
4. Optional: run **Actions → GitHub Snake Game → Run workflow**. The preserved workflow generates contribution art on the `output` branch daily and on pushes to `main`. Change the branch filter if your default branch has a different name. Repository policy must allow its requested `contents: write` permission.

## Explore the design

Open `PREVIEW.html` in your browser with `assets/` alongside it. Use the light/dark switch and narrow your browser window to preview mobile. This approximates GitHub's layout; it is not a live GitHub screenshot. The local browser preview has not been browser-tested in this environment.

- Cinematic six-second looping hero: rotating 3D filament portal, orbiting particles, luminous lettering, and a typing console.
- Separate portrait hero for narrow screens.
- Two animated project cards, with independent cosmic and connected-node scenes.
- Matching section markers, contact links, and closing banner.
- Static SVG alternatives selected through `prefers-reduced-motion` in each picture element, subject to the viewing client's media-query support.
- Your original contribution snake is preserved as an optional expandable section.

All motion is pre-rendered GIF, with editable static SVG artwork alongside it. The README does not use JavaScript or custom CSS. The preview helper uses its own CSS only to approximate Markdown formatting.

## What to upload

Required: `README.md`, `assets/`.
Optional contribution workflow: `.github/workflows/snake.yml`.
Helper files not needed on GitHub: `PREVIEW.html`, `SETUP.md`, and `design-source/`.

## Keep it personal

Edit the README text, toolkit, and links whenever your experience changes. The project and contact URLs are retained from your original README. Their current availability and repository content were not independently verified, so the redesign does not invent project features, metrics, credentials, or experience.

Custom artwork is repository-hosted; it has no external stats, quote, or badge service dependency. GIFs can be replaced with the included SVG stills if you prefer a lighter or fully static profile.

Official profile setup requirements: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme
