var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/monitor/handler.ts
var handler_exports = {};
__export(handler_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(handler_exports);
var webHookUrl = "https://hooks.slack.com/services/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";
async function handler(event, context) {
  for (const record of event.Records) {
    await fetch(webHookUrl, {
      method: "POST",
      body: JSON.stringify({
        "text": `Alarming activity detected: ${record.Sns.Message}`
      })
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
