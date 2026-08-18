Place your image assets here (Vite serves everything in /public at the
site root, so these paths must match exactly):

  /public/14.jpg      -> header photo, used in Navbar
  /public/12.png      -> header logo, used in Navbar
  /public/a4.jpg      -> profile photo, used in About page
  /public/Resume.pdf  -> linked from the CV/Resume nav button

These are the same files already sitting in your old static
Portfolio-Website folder — just copy them in here.

WHY "CV/Resume" SHOWED THE 404 PAGE:
The nav button links to /Resume.pdf. Until that exact file exists in
/public, the browser has nothing to open at that URL, so whatever is
serving the site falls back to the app's own catch-all route — which
renders the same NotFound page you'd see for any bad URL. Once
Resume.pdf is copied into /public with that exact filename (capital R,
capital P — file names are case-sensitive), the link opens the PDF
directly instead.

If your images still don't show up after copying them in, hard-refresh
the page (Ctrl/Cmd+Shift+R) — Vite's dev server can cache a missing-file
response briefly.
