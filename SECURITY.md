# Workshop security scope
This local synthetic exercise demonstrates input validation, escaped Angular text, secret hygiene, least-privilege CI, dependency review and peer approval. It does not implement production authentication, authorization or a full penetration test. Never put real device data or credentials into a prompt, issue, log or screenshot. The mock CORS and plain HTTP setup are for loopback classroom use.

## Dependency review recorded 5 October 2026
The uploaded working graph contains @angular/build 21.2.24 with piscina 5.3.2 through a scoped override. The official Piscina advisory identifies 5.3.2 as patched. Retain the override until a reviewed upstream dependency removes its need; inspect the resulting graph and repeat verification before removal.

The Windows full audit reported 9 high findings on 3 October 2026 from the http-cache-semantics advisory, propagated through Angular CLI's development dependency chain. The graph contains http-cache-semantics 4.2.0. npm audit --omit=dev reported 0 findings in the production dependency subset. That narrower result does not close the full development-tool finding. The official advisory currently identifies versions through 4.2.0 as affected and lists no patched version. A clean validation install on 4 October 2026 with npm 11.9.0 reported one high entry for the same underlying package, zero critical entries and zero findings with --omit=dev. Counts differ across these audit runs; the affected package remains in the graph. Repeat the audit when preparing a later release.

The audit proposed @angular/cli 22.2.1 via npm audit fix --force. This crosses the declared Angular major version and is not an approved repair in this kit. Do not force the upgrade merely to clear the report. Record the dependency chain and owner, check an upstream compatible remedy when available, and review manifest/lockfile changes with clean install, all tests, production build and browser/API checks. Any version override needs evidence that it is patched and compatible. No speculative cache-semantics override is included.

This release can be rehearsed with synthetic loopback data while that development dependency finding is tracked. It is not a production security clearance. A deployment or wider distribution decision requires the repository owner's documented assessment under the applicable policy. Do not hide the finding by reporting only omit=dev or by disabling a security check.

## Install script review
The Windows install listed scripts for esbuild, lmdb, msgpackr-extract and @parcel/watcher as not covered by allowScripts. The build nevertheless passed. These notices do not by themselves prove that a script was blocked or that a package is vulnerable. Review npm.cmd install-scripts ls when supported by the installed npm version and follow the approved package-specific policy. No blanket script approval or npm configuration change is required by this exercise.

## Primary references
- Piscina advisory: https://github.com/advisories/GHSA-67c8-pqhq-4rmx
- Cache semantics advisory: https://github.com/advisories/GHSA-ch52-4w7c-c8xp
- Reproducible npm installation: https://docs.npmjs.com/cli/v11/commands/npm-ci
