# Put the new profile live

1. Unzip this folder.
2. Copy `README.md`, the complete `assets/` folder, and `.github/workflows/snake.yml` into the root of your public `iamksr05/iamksr05` repository. Replace the existing files of the same names. Do not upload the enclosing `iamksr05-main` folder as an extra directory.
3. Commit to your default branch. The README and custom artwork are ready immediately.
4. For the optional contribution snake, open **Actions → GitHub Snake Game → Run workflow** on the `main` branch. The existing workflow generates assets on the `output` branch and also runs daily. If your default branch is not `main`, update its push branch in `.github/workflows/snake.yml` first.
5. If GitHub disables Actions, enable them in the repository. The included workflow requests `contents: write`; repository or organization policy must allow that permission. No personal access token is needed. Once the workflow finishes, expand the snake section in the README.

## Preview

Open `PREVIEW.html` in a browser with `assets/` next to it. This is a local approximation of GitHub's Markdown layout, not a screenshot from the live profile. The preview includes a light/dark switch. The header has gentle orbital motion, and respects reduced-motion preferences. A narrower header is selected on small screens. The contribution snake is a separate remotely generated asset and needs its first successful workflow run.

## Editing

- Edit your biography, toolkit, and links directly in `README.md`.
- Custom vector artwork lives in `assets/`; SVG text can be edited in a text editor.
- Keep relative paths intact. Upload the assets along with the README.
- The existing project URLs and social/contact links were preserved from your original README. Repository contents and link availability could not be independently verified here, so no new project capabilities or results are claimed.
- The essential design has no external badge, quote, or stats service dependency. The optional snake keeps your original GitHub Actions workflow.
- `PREVIEW.html` and `SETUP.md` are optional helper files; they do not need to be uploaded to your profile repository.

GitHub's profile README requirements: https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme
