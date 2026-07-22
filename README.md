<p align="center">
  <img src="public/thumbnail.png" alt="W'xOps — you own your infrastructure, you own your platform" width="600">
</p>

# W'xOps — Internal Developer Portal

W'xOps is a self-hosted Internal Developer Portal built around the Golden
Path — one place for developers to onboard, ship, and operate services
without waiting on tickets or juggling a dozen tools.

## What makes it different

- **No database.** Git is the source of truth for the catalog and
  configuration — nothing to patch, back up, or leak.
- **One identity, everywhere.** A single token works for the portal,
  `kubectl`, and CI — no second login, no separate permission system to
  maintain.
- **100% GitOps.** Every change is a reviewable Git PR. The portal never
  writes directly to your cluster.
- **One lightweight binary.** No plugin ecosystem, no Node.js + database
  stack to operate — just a single Go binary with the frontend built in.
- **Runs inside your infrastructure.** Self-hosted by design — your data
  never leaves your environment.

This site (`wxops.cloud`) is the project's marketing landing page and links
through to the [full documentation](https://docs.wxops.cloud).

## Contact

Questions, feedback, or interested in running W'xOps for your team? Reach out
at **contact@wxops.cloud**, or use the form on the
[Talk to the Maintainer page](https://wxops.cloud/demo).

## License

MIT — see [LICENSE](LICENSE).
