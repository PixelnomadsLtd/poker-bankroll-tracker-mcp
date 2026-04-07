# Poker Bankroll Tracker MCP Server

An MCP (Model Context Protocol) server that wraps the [Poker Bankroll Tracker](https://www.pokerbankrolltracker.net/) API, letting AI assistants query poker session data.

## Setup

### Prerequisites

- Node.js >= 20
- A Poker Bankroll Tracker API key

### Install

```bash
npm install
npm run build
```

### Configure

Set the `PBT_API_KEY` environment variable:

```bash
export PBT_API_KEY="your-api-key-here"
```

### Add to Claude Code

Add to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "poker-bankroll-tracker": {
      "command": "node",
      "args": ["/path/to/poker-bankroll-tracker-mcp/dist/index.js"],
      "env": {
        "PBT_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## Available Tools

### get_sessions

Fetch poker sessions with optional filters. Returns session data with calculated profit/loss.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `start` | string | Start date (YYYY-MM-DD) |
| `end` | string | End date (YYYY-MM-DD) |
| `type` | string | Session type: `cashgame`, `tournament`, `payout`, `costs`, `casinogame`, `jackpot` (comma-separated) |
| `currency` | string | ISO currency codes (comma-separated) |
| `staking` | boolean | Filter by staking sessions |

All parameters are optional.

**Example:**
```
Get my cash game sessions from March 2026
→ get_sessions({ start: "2026-03-01", end: "2026-03-31", type: "cashgame" })
```

### get_stats

Compute aggregate statistics: total profit, win rate, average session profit, total sessions, breakdowns by location/stakes/month.

Takes the same filter parameters as `get_sessions`.

**Example:**
```
How am I doing at 1/2 NLH this year?
→ get_stats({ start: "2026-01-01", type: "cashgame" })
```

### get_session_by_id

Get a specific session by its ID.

**Parameters:**
| Name | Type | Description |
|------|------|-------------|
| `id` | number | Session ID (required) |

## API Notes

- **Rate limit:** The Poker Bankroll Tracker API allows 25 requests/day. The server caches responses for 5 minutes to reduce API usage.
- **Base URL:** `https://api.pokerbankrolltracker.net/v1`
- **Auth:** Bearer token via `PBT_API_KEY`

## Development

```bash
npm run dev        # Watch mode
npm test           # Run tests
npm run lint       # Lint with oxlint
npm run format     # Format with prettier
```

## License

MIT
