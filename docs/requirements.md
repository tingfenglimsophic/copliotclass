# DeviceTest Guard requirements

Owner: workshop maintainers. Reviewed: 2 October 2026. Synthetic data only.

- R1 Every temperature from 18 through 30 inclusive is acceptable.
- R2 A yield of 95 percent or greater passes when all temperatures pass.
- R3 An empty temperature list returns Unknown, regardless of yield.
- R4 Report exact case-sensitive duplicate device IDs once, in the order a duplicate is first detected. Preserve every record.
- R5 An empty record list displays No device records and no duplicate warning.
- R6 Track Angular rows by the unique recordId. deviceId may repeat.
- R7 Treat both HTTP payloads as unknown. Verify the requested batchId, arrays, nonempty string IDs, finite temperature numbers, finite yield in 0 through 100, unique recordId in each response and complete one-to-one recordId membership. Allow empty temperatures and repeated deviceId. Construct approved fields, copy arrays and preserve order. Reject invalid input before replacing visible records. Do not display raw server errors.

Acceptance: 22 supplied pure-function tests pass, Angular production build succeeds, local fixture statuses are Pass Pass Unknown Fail, DEV-A warning appears once, four rows remain visible, an empty list shows the empty state, valid two-API load works, API errors retain the fixture. These UI and integration checks are manual; pure-function tests do not cover Angular rendering or HTTP subscriptions.

Both tools start from the identical starter. Use separate GitHub repositories and feature branches. Do not remove assertions or weaken CI to make it green.
