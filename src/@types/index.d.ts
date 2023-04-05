declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * OpenAI API Key
     * You can obtain from: https://platform.openai.com/account/api-keys
     */
    readonly OPENAI_API_KEY: string;

    /**
     *
     */
    readonly AZURE_OPENAI_RESOURCE_KEY: string;
    /**
     *
     */
    readonly AZURE_OPENAI_RESOURCE_ENDPOINT: string;
    /**
     *
     */
    readonly AZURE_OPENAI_RESOURCE_DEPLOYMENT: string;
  }
}
