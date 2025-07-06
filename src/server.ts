import express from 'express';
import { EVENTS } from './events.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3081;

// Support JSON payloads
app.use(express.json());
// Support form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve node_modules for frontend access to XTP client
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// Commands are now handled in the frontend
// This endpoint is kept for backward compatibility but returns empty
app.get("/slash-commands", async (_, reply) => {
  reply.send({
    slash_commands: []
  })
})

//broadcasting xtp plugin response
app.post('/messages', async (req, reply) => {
  // we're just assuming that they are who they say they are
  // that's okay for this demo
  let { nick, body } = req.body;

  // remove trailing spaces
  const endre = new RegExp('(&nbsp;)*\\s*(\\<br\\>)*$');
  body = body.replace(endre, '');

  const message = {
    type: "message",
    payload: {
      nick, body, type: 'text'
    }
  }

  EVENTS.broadcast(message)
  reply.status(201).send({ success: true })
})



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
}); 