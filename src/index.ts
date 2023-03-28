import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const ai = new OpenAIApi(config);

const systemMessage = {
  AKANE: `You are a teen ager girl called あかね.
  You have a pink long hair.
  You calls herself "うち" and speaks in the Kansai dialect.
  You has a twin younger sister called あおい, then you calls her 'あおい'.
  You must follow above rules, then must have a conversion with me who as あおい.`,
  // You are Akane Kotonoha, you have a twin younger sister called Aoi.
  // Akane calls Aoi as 'あおい', then Aoi calls Akane as "お姉ちゃん".
  // Then Akane calls herself "うち", and Akane speaks in the Kansai dialect.
  // The following prompts are conversation of Akane and Aoi.
  // You should roll play as Akane kotonoha.`,
  AOI: `You are a 15 years old girl called あおい.
  You have a skyblue long hair.
  You calls herself わたし.
  You has a twin older sister called あかね, then あおい calls her 'おねえちゃん' or 'おねーちゃん'.
  You converses with あかね in caual talk.
  You must follow above rules, then must have a conversation with me who as あかね`,

  // You are Aoi Kotonoha, you have a twin older sister called Akane
  // Akane calls Aoi as 'あおい', then Aoi calls Akane as 'お姉ちゃん'.
  // Aoi calls herself '私' and speaks in the default dialect.
  // The following prompts are conversation of Akane and Aoi.
  // You should roll play as Aoi Kotonoha.
  // `,
};

const aoiSentences = [
  "わたしね、大きくなったらおねーちゃんのお嫁さんになる",
  "大きくなったのでおねーちゃんのお嫁さんになります",
];

const akaneSentences = ["そーなんか？よーわからんけど待ってるわ！"];

const Speakers = ["AKANE", "AOI"] as const;
type Speaker = typeof Speakers[number];

const SpeakerI18N = {
  AKANE: "あかね",
  AOI: "あおい",
};

const buildSpeakers = (speaker: Speaker): ChatCompletionRequestMessage[] => {
  const systemMsg = systemMessage[speaker];
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: systemMsg,
    },
  ];

  aoiSentences.forEach((msg, idx) => {
    messages.push({
      role: speaker === "AOI" ? "assistant" : "user",
      content: msg,
    });
    const secondMsg = akaneSentences[idx];
    if (!secondMsg) return;
    messages.push({
      role: speaker === "AKANE" ? "assistant" : "user",
      content: secondMsg,
    });
  });

  return messages;
};

const debug = false;

(async () => {
  let lastSpeaker =
    aoiSentences.length > akaneSentences.length ? "AOI" : "AKANE";
  let isFirst = true;
  while (true) {
    const messages = buildSpeakers(lastSpeaker === "AKANE" ? "AOI" : "AKANE");
    if (isFirst) {
      messages
        .filter((m) => m.role !== "system")
        .forEach((m) => console.log(m.content));
      isFirst = false;
    }

    if (debug) {
      console.log("----------");
      console.log(messages);
      console.log("----------");
    }

    const res = await ai
      .createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      })
      .catch((err) => {
        return {
          data: err.response.data,
        };
      });

    const message = res.data.choices?.[0]?.message.content;
    if (!message) {
      console.log(res.data);
      console.log("Response was error. exit.");
      break;
    }

    lastSpeaker = lastSpeaker === "AOI" ? "AKANE" : "AOI";
    console.log(`${SpeakerI18N[lastSpeaker]}「${message}」`);
    if (lastSpeaker === "AKANE") {
      akaneSentences.push(message);
    } else {
      aoiSentences.push(message);
    }

    if (debug) {
      console.log("--------------------");
      console.log(aoiSentences);
      console.log(akaneSentences);
      console.log("--------------------");
    }

    await new Promise((r) => setTimeout(r, 1500));
  }
})();
