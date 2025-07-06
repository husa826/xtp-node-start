import * as main from "./main";

import { Message } from "./pdk";

export function handleMessage(): number {
  const untypedInput = JSON.parse(Host.inputString());
  const input = Message.fromJson(untypedInput);

  const output = main.handleMessageImpl(input);

  const untypedOutput = Message.toJson(output);
  Host.outputString(JSON.stringify(untypedOutput));

  return 0;
}
