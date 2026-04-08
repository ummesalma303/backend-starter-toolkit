# Contributing to node-backend-template

Thank you for wanting to contribute! This project is designed to be easy for new contributors, and your help is welcome.

## Ways to contribute

- Report bugs or suggest improvements via issues
- Improve documentation and examples
- Add new features or CLI enhancements
- Fix tests, linting, and project scaffolding issues

## Getting started

1. Fork the repository.
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/node-backend-template.git
cd node-backend-template
```

3. Install dependencies:

```bash
pnpm install
```

4. Create a new branch for your work:

```bash
git checkout -b feature/my-change
```

## Development workflow

- Keep changes small and focused.
- Commit logically grouped changes with descriptive messages.
- Run tests and linting before opening a pull request.
- If the change is a bugfix or feature, add or update tests where appropriate.

## Testing

Run the test suite before submitting changes.

```bash
pnpm test:run
```

If the repository does not include the script in this package, run the relevant test command from the template package or workspace.

## Code style

Please follow the existing code style and conventions in the project.

- Use `pnpm lint` to check lint rules.
- Use `pnpm lint:fix` and `pnpm format` to fix formatting issues.
- Keep TypeScript/JavaScript code readable and consistent with the current project style.

## Pull request process

1. Fork the repository and branch from `main`.
2. Make changes in a feature branch.
3. Commit with clear, focused messages.
4. Push your branch to your fork.
5. Open a pull request against the upstream `main` branch.
6. In the PR description, include:
   - What the change does
   - Why it is needed
   - How to test it

## Issues

- Search existing issues before opening a new one.
- Provide a clear title and description.
- Include reproduction steps, expected behavior, and any error output.

## Community guidelines

Please be respectful, patient, and collaborative.

- Follow the standards set in `CODE_OF_CONDUCT.md`.
- Welcome feedback and iterate on requested changes.
- If you are unsure, ask for guidance in the issue or PR.
