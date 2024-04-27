import { SNSEvent } from "aws-lambda";

const webHookUrl = "";

async function handler(event: SNSEvent, context) {
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            body: JSON.stringify({
                "text": `Alarming activity detected: ${record.Sns.Message}`
            })
        })
    }
}


export { handler }