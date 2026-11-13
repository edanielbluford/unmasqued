# Unmasqued web application outline

The web client is the primary way to use Unmasqued. Players and administrators
must be able to use it in a browser without installing anything. PWA
installation is optional; offline editing and synchronization are later
capabilities, not prerequisites for the first release.

## Application responsibilities

- Render responsive, accessible interfaces for players and administrators.
- Let players view the characters and sheets they are authorized to access.
- Let administrators manage their games and shared game data.
- Call the Unmasqued API for authentication, authorization, and persisted data.
- Keep API contracts separate from server-side domain implementation.

The server remains authoritative for permissions, game rules, and saved data.
The client must not assume that hiding a control grants or enforces permission.

## Proposed Angular structure

Use standalone Angular components, lazy-loaded feature routes, and typed
reactive forms where forms are needed. Organize by feature so each workflow's
pages, UI, and data access can evolve together.

```text
src/
  app/
    app.config.ts
    app.routes.ts
    core/
      auth/
      guards/
      http/
      shell/
    shared/
      components/
      forms/
      models/
    features/
      games/
        data-access/
        pages/
        ui/
      characters/
        data-access/
        pages/
        ui/
      admin/
        data-access/
        pages/
        ui/
  styles/
    _tokens.scss
    styles.scss
```

### Main areas

- **Core:** application shell, authentication state, route guards, and HTTP
  interceptors. Initialize these once at the application level.
- **Shared:** reusable presentation components and form controls with no
  dependency on a specific game workflow.
- **Games:** game selection and game overview, always scoped to the signed-in
  user's memberships.
- **Characters:** character list, character detail, and sheet display. Keep
  sheet sections composable so different character types can vary without
  duplicating the whole page.
- **Admin:** administrator-only game settings and management workflows.
  Add subsections such as players, calendar, actions, plots, and rumors as
  those features are implemented.
- **Data access:** feature-specific API calls and view state. Use the shared
  API contracts rather than duplicating request and response shapes.

Example top-level routes:

```text
/login
/games
/games/:gameId
/games/:gameId/characters
/games/:gameId/characters/:characterId
/games/:gameId/admin
```

Protect routes for user experience, but enforce all access again in the API.
Do not put private game data in global client state shared across game
boundaries.

## Storybook component documentation

Use **Storybook for Angular** as the component catalog and visual documentation
site. It is for developing and reviewing components in isolation; it is not a
replacement for application or API tests.

```text
.storybook/
  main.ts
  preview.ts
src/
  app/
    shared/
      components/
        button/
          button.component.ts
          button.component.html
          button.component.scss
          button.stories.ts
```

For each reusable component, document:

- Its purpose, inputs, outputs, and accessibility expectations.
- A default story plus important variants, such as disabled, loading, empty,
  error, and long-content states where applicable.
- Controls for meaningful inputs and actions for user-triggered outputs.
- Keyboard and screen-reader behavior; use Storybook accessibility checks.
- Synthetic data only. Stories must not require a live API, real player data,
  or production credentials.

Start Storybook coverage with shared controls, form fields, status messages,
dialogs, and character-sheet sections. Add stories for feature-specific
components when they have useful independent states to review.

## First implementation slice

The initial browser slice is implemented with synthetic demo data:

- The root route opens the Sable Harbor demo character list.
- The list links to read-only character sheets at
  `/games/:gameId/characters/:characterId`.
- The read-only sheet groups identity, tracks and morality, named positive and
  negative traits by category, abilities, powers by discipline, and the other
  sections represented in legacy Grapevine sheets.
- The reusable character sheet has Storybook entries under
  `Characters/Character sheet`.
- Unknown character IDs show a not-found state.

This is a UI prototype only. The demo data service is not authentication,
authorization, or persistent storage; no API or database is connected. The
next product step is to agree on the real player and administrator access
rules, then replace the demo data with an authorized API read flow.

## Validation

- Unit-test UI logic, form validation, and feature data-access behavior.
- Build and serve Storybook in CI to catch broken component documentation.
- Run accessibility checks on shared components and key user flows.
- Add browser-level tests for sign-in, game isolation, and viewing a character
  sheet.
- Keep offline storage and sync behind a later design and testing milestone.

## Run locally

Use Node.js 26 LTS (tested with 26.13.1; see the repository `.nvmrc`) and npm.
From `apps/web`, install dependencies and start the browser app:

```powershell
npm ci
npm start
```

The app is served at `http://localhost:4200`. To browse the component
documentation, start Storybook in a second terminal:

```powershell
npm run storybook
```

Storybook is served at `http://localhost:6006`. Validate changes with:

```powershell
npm run build
npm test -- --watch=false
npm run build-storybook
```
