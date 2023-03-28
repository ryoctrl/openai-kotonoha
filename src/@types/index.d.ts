declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * OpenAI API Key
     * You can obtain from: https://platform.openai.com/account/api-keys
     */
    readonly OPENAI_API_KEY: string;
  }
}
