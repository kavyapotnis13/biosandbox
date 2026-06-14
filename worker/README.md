# BioSandbox Lab Partner — Worker deployment

This folder holds a tiny Cloudflare Worker that sits between the static frontend
and the Anthropic API. The worker keeps your API key off the public internet —
it lives only as a Cloudflare secret, never in this repo or in the browser.

## What you'll need

1. **An Anthropic API key** — sign up at https://console.anthropic.com, add a
   credit card, and create a key. (Parent on board for this step.) Save it
   somewhere temporary — you'll paste it once into a secure prompt.
2. **A Cloudflare account** — free tier is fine. Sign up at
   https://dash.cloudflare.com/sign-up.
3. **Node.js 18+** on your machine (`node --version` to check). If you don't
   have it, install via https://nodejs.org or `brew install node`.

## One-time setup

From the `worker/` folder:

```bash
cd worker
npm install                                  # installs wrangler (the CLI)
npx wrangler login                           # opens a browser window to Cloudflare
npx wrangler secret put ANTHROPIC_API_KEY    # paste your sk-ant-... key when prompted
```

The `secret put` step encrypts the key into Cloudflare's storage. It never
appears in your code, your git history, or your terminal scrollback.

## Deploy

```bash
npx wrangler deploy
```

Wrangler will print a URL like:

```
https://biosandbox-tutor.<your-subdomain>.workers.dev
```

That's your worker's address. Copy it down.

## Wire the frontend

Open `js/tutor.js` and update the `WORKER_URL` constant at the top:

```js
const WORKER_URL = 'https://biosandbox-tutor.<your-subdomain>.workers.dev/chat';
```

Note the `/chat` at the end — that's the endpoint path the worker expects.

Commit the change, push, and the live site will pick it up.

## Test it works

```bash
curl -X POST https://biosandbox-tutor.<your-subdomain>.workers.dev/chat \
  -H "content-type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hi!"}],"audience":"high"}'
```

You should get back a JSON blob with a `content` array. If you see an `error`
field instead, scroll up to check that the secret was set correctly.

## Updating the system prompt

The system prompt (and the list of modules the tutor knows about) lives in
`src/index.js`. Edit it there, then redeploy:

```bash
npx wrangler deploy
```

That's the whole loop. No backend infrastructure to babysit.

## Cost expectations

- Cloudflare Workers free tier: 100,000 requests/day. You won't approach this.
- Anthropic API (Haiku 4.5): roughly $1 per 1M input tokens, $5 per 1M output
  tokens. A typical chat turn is ~500 input + ~200 output tokens, so somewhere
  around 1/10th of a cent per turn. $5 of credit covers ~5,000 turns.

## Troubleshooting

- **CORS error in browser console** → the worker isn't deployed yet, or the
  `WORKER_URL` in `js/tutor.js` is wrong. Curl-test the URL first.
- **"Server is missing ANTHROPIC_API_KEY"** → you didn't run `wrangler secret
  put` (or you deployed to a different worker name).
- **401 from Anthropic** → the key is wrong or expired. Re-create it in the
  Anthropic console and re-run `wrangler secret put`.
