# XTP Node Test

A Node.js application with XTP plugin integration and a files listing API.

## Features

- **XTP Plugin Integration**: Supports the "loudy" plugin for message handling
- **Files API**: REST endpoint to list all files in the workspace
- **Slash Commands**: Built-in `/files` command to get files list

## API Endpoints

### GET /api/files

Returns a list of all files in the workspace directory.

**Response:**
```json
{
  "success": true,
  "files": [
    {
      "name": "package.json",
      "path": "package.json",
      "isDirectory": false
    },
    {
      "name": "src",
      "path": "src",
      "isDirectory": true
    }
  ]
}
```

## Slash Commands

### /files

Lists all files in the workspace. This command fetches data from the `/api/files` endpoint and formats it for display.

**Usage:**
```
/files
```

## Development

### Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

### Testing

```bash
npm test
```

### Plugin Development

The "loudy" plugin is located in `plugins/loudy/` and can be modified to handle different message types.

## Project Structure

```
xtp-node-test/
├── src/
│   ├── server.ts          # Main server with API endpoints
│   ├── commands.ts        # Slash command handlers
│   ├── events.ts          # Event handling
│   └── tests/             # Test files
├── plugins/
│   └── loudy/             # XTP plugin
├── public/                # Static files
└── package.json
``` 