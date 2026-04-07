# Poker Bankroll Tracker MCP Server

An MCP (Model Context Protocol) server that wraps the [Poker Bankroll Tracker](https://www.pokerbankrolltracker.net/) API, letting AI assistants query poker session data.

## Install

```bash
npm install -g poker-bankroll-tracker-mcp
```

Or run directly with npx:

```bash
PBT_API_KEY="your-api-key" npx poker-bankroll-tracker-mcp
```

## Configuration

### Environment Variable

The server requires a `PBT_API_KEY` environment variable with your Poker Bankroll Tracker API key.

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "poker-bankroll-tracker": {
      "command": "npx",
      "args": ["-y", "poker-bankroll-tracker-mcp"],
      "env": {
        "PBT_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Claude Code

Add to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "poker-bankroll-tracker": {
      "command": "npx",
      "args": ["-y", "poker-bankroll-tracker-mcp"],
      "env": {
        "PBT_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### Other MCP Clients

Run the server over stdio:

```bash
PBT_API_KEY="your-api-key" poker-bankroll-tracker-mcp
```

## Available Tools

### get_sessions

Fetch poker sessions with optional filters. Returns session data with calculated profit/loss.

> **Note:** Broad date ranges may return many sessions and consume significant tokens. Use narrow date ranges when possible.

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
-> get_sessions({ start: "2026-03-01", end: "2026-03-31", type: "cashgame" })
```

### get_stats

Compute aggregate statistics: total profit, win rate, average session profit, total sessions, breakdowns by location/stakes/month.

Takes the same filter parameters as `get_sessions`.

**Example:**
```
How am I doing at 1/2 NLH this year?
-> get_stats({ start: "2026-01-01", type: "cashgame" })
```

## API Notes

- **Rate limit:** The Poker Bankroll Tracker API allows 25 requests/day. The server caches responses for 5 minutes to reduce API usage.
- **Base URL:** `https://api.pokerbankrolltracker.net/v1`
- **Auth:** Bearer token via `PBT_API_KEY`

## Development

```bash
git clone https://github.com/0xAndoroid/poker-bankroll-tracker-mcp.git
cd poker-bankroll-tracker-mcp
npm install
npm run build
```

```bash
npm run dev        # Watch mode
npm test           # Run tests
npm run lint       # Lint with oxlint
npm run format     # Format with oxfmt
```

## License

MIT
