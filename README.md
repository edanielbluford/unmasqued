# Unmasqued

Unmasqued is a web-first application for managing live-action role-playing
(LARP) games. It is intended to give administrators and players a shared place
to manage game information and access character sheets, without requiring
players to install an application.

The project aims to modernize LARP administration workflows represented in the
legacy Grapevine source. The current repository is an early scaffold, not yet a
usable game-management product.

## Purpose and direction

Unmasqued is being designed to:

- Give administrators tools for managing games, participants, and shared game
  information.
- Let players access their characters and sheets in a browser.
- Keep each game's information private to its authorized members.
- Work well on desktop and mobile browsers, with optional installable app
  experiences considered later.
- Add offline editing and synchronization only after permissions and
  conflicting-edit behavior are well defined.
- Explore import and export support for legacy Grapevine data as the domain
  model develops.

The intended architecture is a web client backed by a shared API and
database. The server will be the authoritative source of shared data. Browser
access is a core requirement; installing the application should remain
optional.

## Current status

The project currently contains an Angular web starter with Storybook
configured for component documentation. Its generated Angular and Storybook
examples are scaffolding, not Unmasqued features.

Authentication, game and character workflows, the API, database, legacy
import/export, and offline synchronization have not been implemented yet.

## Repository layout

- `apps/web/` - Angular browser application and Storybook configuration.
- `apps/api/` - planned API application.
- `libs/api-contracts/` - planned shared API types and contracts.
- `libs/domain/` - planned server-side game rules and domain model.
- `libs/legacy-import/` - planned legacy data import and conversion.
- `db/migrations/` - planned database migrations.
- `tests/fixtures/` - test data for import and application behavior.
- `infra/` - planned local development and deployment configuration.

## Run the web app

Use the Node.js version in [`.nvmrc`](./.nvmrc). From the repository root,
run:

```powershell
Set-Location .\apps\web
npm ci
npm start
```

The app is served at `http://localhost:4200`. To view component documentation,
run this in a second terminal:

```powershell
Set-Location .\apps\web
npm run storybook
```

Storybook is served at `http://localhost:6006`. Additional development and
validation commands are documented in [`apps/web/README.md`](./apps/web/README.md).
