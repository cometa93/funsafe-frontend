# Production deployment

`master` is the integration branch. Run **Create release branch** from `master`
with a SemVer value such as `0.1.0`. It builds the application, writes the
version commit to `release/v0.1.0`, and pushes that branch. Every `release/**`
push deploys the static build through the protected `production` environment.

## Production environment variables

- `DEPLOY_HOST`: `s88.mydevil.net`
- `DEPLOY_PORT`: `22`
- `DEPLOY_USER`: `funventure`
- `DEPLOY_ROOT`: `/usr/home/funventure/domains/safe.funventure.eu/public_html`
- `RELEASE_ROOT`: `/usr/home/funventure/apps/safefun/frontend`
- `PUBLIC_SITE_URL`: `https://safe.funventure.eu`
- `VITE_API_URL`: `https://api.safe.funventure.eu`
- `VITE_CHAT_URL`: `wss://chat.safe.funventure.eu/chat/v1`
- `VITE_DEMO_MODE`: `false`

## Production environment secrets

- `DEPLOY_SSH_PRIVATE_KEY`
- `DEPLOY_KNOWN_HOSTS`

Use a dedicated deploy key whose public half is installed on MyDevil. Frontend
variables are intentionally public and must be stored as GitHub Variables, not
Secrets.
