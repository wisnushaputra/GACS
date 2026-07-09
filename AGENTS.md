# Agent Guidelines

## General approach
- **Read available documentation first**: Start with `README*`, `package.json` (if present), CI configs, and any existing agent instructions (`CLAUDE.md`, `.cursor/rules/`, etc.).
- **Prioritize executable sources of truth**: Trust code/config over prose if there are conflicts.
- **Root cause analysis**: For bugs, find the root cause, not just symptoms. Fix centrally.
- **Verify**: Always run verification steps (tests, lint, typecheck) after changes.

## Commands
- Use `npm test` or specific test commands from `package.json` to run tests.
- Use `npm run lint` or similar to check linting.

## Architecture
- This repository appears to be simple, with a `docs` directory. If more specific architecture is found, update this section.