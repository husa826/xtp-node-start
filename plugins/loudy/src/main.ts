import { Message, MessageType } from "./pdk";

/**
 * Called when a message is sent to this plugin.
 *
 * @param {Message} input - The message without the slash command
 * @returns {Message} The message you will reply with as the bot
 */
export function handleMessageImpl(input: Message): Message {
  // Check if the input contains a request for files
  if (input.body?.toLowerCase().includes('files') || input.body?.toLowerCase().includes('list')) {
    return {
      type: MessageType.Text,
      body: "📁 **Files List Requested**\n\nI'll fetch the files list from the Node.js API for you. Please check the API response at `/api/files` endpoint."
    }
  }
  
  return {
    type: MessageType.Text,
    body: `${input.body?.toUpperCase()}`
  }
}
