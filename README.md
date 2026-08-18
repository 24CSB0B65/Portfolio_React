# Deekshitha Portfolio — React (Assignment 2)

A React conversion of the Assignment-1 static HTML/CSS portfolio. The visual
design is unchanged from the original site — this assignment only adds
components, state, side effects, and client-side routing on top of it.

## Setup / Run

```bash
npm install
npm run dev       # start the dev server
npm run build      # production build (must succeed with zero console errors)
```

Before running, copy `14.jpg`, `12.png`, `a4.jpg`, and `Resume.pdf` from the
old static `Portfolio-Website` folder into `public/` (see
`public/README-images.txt`).

## Component Tree

```
main.jsx
 └─ App.jsx                  (theme state lifted here)
     └─ Routes
         └─ Layout            (Navbar + <Outlet/> + Footer, persists across routes)
             ├─ Navbar.jsx    (receives theme + toggleTheme via props)
             ├─ Footer.jsx
             └─ <Outlet/>
                 ├─ Home.jsx
                 ├─ About.jsx
                 ├─ Projects.jsx
                 │    └─ ProjectCard.jsx   (per-instance "expanded" state)
                 │         └─ ProjectInfo.jsx   (receives `tech` — prop drilling level 2)
                 ├─ ProjectDetails.jsx  (/projects/:projectId, via useParams)
                 │    └─ ProjectInfo.jsx
                 ├─ Contact.jsx
                 │    └─ ContactForm.jsx  (controlled inputs + validation state)
                 └─ NotFound.jsx   (path="*")
```

## State-Lifting Decisions

- **Theme (dark/light)** lives in `App.jsx` — the top-level component — and is
  passed down to `Navbar` via props, since it's the only component that needs
  to trigger the toggle. It's persisted to `localStorage` in a `useEffect`
  and re-applied as a `data-theme` attribute on `<html>` so CSS can react to
  it without prop-drilling into every page.
- **Contact form fields + validation errors** are local to `ContactForm.jsx`
  — no other component needs them.
- **"View Details" expanded state** is local to each `ProjectCard.jsx`
  instance, proving state is scoped per component instance rather than
  shared across cards.

## useEffect Hooks

| Location | Purpose |
|---|---|
| `Home.jsx` | Empty-dependency effect that simulates a ~1s loading sequence with `setTimeout` before showing page content. Timer is cleared on unmount. |
| `App.jsx` | Runs whenever `theme` changes; persists the value to `localStorage` and updates the `data-theme` attribute so it's read back correctly on the next load. |
| `Navbar.jsx` | Subscribes to `window.addEventListener('resize', ...)` to drive responsive mobile-menu behavior; the listener is removed in the cleanup function on unmount to avoid leaks. |

## Routing

- `/` and `/Home` → Home
- `/about` → About
- `/projects` → Projects (lists all projects)
- `/projects/:projectId` → ProjectDetails (dynamic route via `useParams`)
- `/contact` → Contact
- `*` → NotFound (404, links back to Home)

All navigation uses `<NavLink>` / `<Link>`, so routing never triggers a full
page reload.
