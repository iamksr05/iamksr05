# Editable motion source

The animations are custom procedural vector art, rendered frame by frame. You do not need to run this to use the profile; the final GIFs are already included.

To regenerate the hero and project artwork, install Node.js and FFmpeg, run `npm install` in this folder, then `npm run build`. The script writes the main assets into `../assets/`. Mobile section labels and the mobile footer are separately editable SVG assets. The profile preview is a separate HTML helper.

The portal is a projected toroidal mesh with rotating meridians, traveling points, and periodic surface deformation. All renders are deterministic; there are no external images, API calls, or API keys.
