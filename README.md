# DeviceTest Guard Angular starter
Deliberate defects support identical Copilot and Antigravity exercises. Read docs/requirements.md. Node 24.19.0 is the CI classroom target; engines permit >=24.12.0 <25. Angular framework and compiler-cli are pinned to 21.2.25, build and CLI to 21.2.24, and TypeScript to 5.9.3. The supplied lockfile matches the working Windows manifest; the scoped build override pins Piscina to 5.3.2.

For a new copy: npm.cmd ci, npm.cmd run test:all, npm.cmd run build, npm.cmd start. Run each command separately. An already working copy can go directly to ../MODULE_REHEARSAL.md. Retain package-lock.json in Git. Review SECURITY.md for the dated dependency findings.

Starter: 22 tests, 13 pass, 9 fail. Status-only repair: test:status gives 9 pass (test:ci is its compatibility alias); test:all gives 17 pass and 5 fail. Complete corrected outcome: 22 pass. Native Node TypeScript execution does not typecheck Angular components; the build and browser/API checks remain separate gates.

The verification workflow requires a committed lockfile. Starter CI is intentionally red until all requirements are implemented. Configure main protection after bootstrap and after obtaining the actual verification check name. Use a feature branch and independent review for implementation.
