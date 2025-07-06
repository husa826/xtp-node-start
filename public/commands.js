// Frontend commands handler - XTP client in browser
import createClient from '/node_modules/@dylibso/xtp/dist/esm/mod.js';

// Message type definitions (for reference)
// Message: { body: string; type: string; nick?: string; }
// BotMessage: { body: string; type: string; nick: string; }
// CommandResult: { type: string; payload: BotMessage; }

let xtpClient = null;
let isInitialized = false;

const GUEST_KEY = 'replace-me-48811a2f-7901-427b-bd0a-b16a9254a743';
const EXT_NAME = 'SlashCommand';

const BUILTIN_COMMANDS = {
  // Built-in commands can be added here
};

async function initializeXtpClient() {
  if (!isInitialized) {
    try {
      xtpClient = await createClient({
        appId: 'app_01js290hcjft88esqdq4qsc8n9',
        token: 'xtp0_AZZFB73TcRi_TbeV7gEbWghU4-kOO7n9aE4g9xYqtnCJsRw6vng83A',
        useWasi: true
      });
      isInitialized = true;
      console.log('XTP client initialized successfully in browser');
    } catch (error) {
      console.error('Failed to initialize XTP client in browser:', error);
      throw error;
    }
  }
  return xtpClient;
}

export async function getCommands() {
  await initializeXtpClient();
  return Object.keys(BUILTIN_COMMANDS).concat(await xtpClient.listAvailablePlugins(
    EXT_NAME,
    GUEST_KEY,
  ));
}

async function runSlashCommand(commandName, message) {
  await initializeXtpClient();
  
  // our Extension Point is:             `SlashCommand`
  // our export that we want to call is: `handleMessage`
  const pluginFunc = xtpClient.extensionPoints.SlashCommand.handleMessage;

  const result = await pluginFunc(
    GUEST_KEY,
    JSON.stringify(message), // The plug-in expects a json Message
    {
      // this is by default the name of our plugin,
      // which is the name of the command
      bindingName: commandName,
      default: "{}"
    }
  );
  return JSON.parse(result || '{}');
}

export async function commandHandler(message) {
  // split into command and commandBody
  const re = new RegExp('^/([^\\s]+)\\s*(.*)$');
  const [_full, commandName, commandBody] = message.body.match(re) || ['', '', ''];
  console.log('commandName', commandName);
  // replace the body with just the arguments to the command for simplicity
  if (commandBody) message.body = commandBody;

  let botMessage = {
    body: `Error: unknown command ${commandName}`,
    type: 'text',
    nick: 'bot',
  };

  const command = BUILTIN_COMMANDS[commandName];
  if (command) {
    const result = command(message);
    botMessage = await Promise.resolve(result); // Handle both sync and async commands
  } else { // add this else clause
    // if we fail to find the command in the built-ins, let's check xtp
    const pluginCommands = await xtpClient.listAvailablePlugins(
      EXT_NAME,
      GUEST_KEY,
    );
    console.log('pluginCommands', pluginCommands);
    if (pluginCommands.includes(commandName)) {
      // running a plugin is no different than calling a normal function
      // but it's sandboxed and language independent thanks to Wasm
      botMessage = await runSlashCommand(commandName, message);
    }
  }

  botMessage.nick = 'bot';

  return {
    type: "message",
    payload: botMessage
  };
} 