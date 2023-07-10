import axios from "axios";
import { SupportedLanguages } from "../types";

const config = {
  headers: {
    "Ocp-Apim-Subscription-Key": `${process.env.AZURE_KEY_TRANSLATION}`,
    "Ocp-Apim-Subscription-Region": "centralindia",
    "Content-Type": "application/json",
  },
};

export class Azure {
  static async translate(text: string, language: SupportedLanguages) {
    const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${language}`;

    try {
      const response = await axios.post(url, [{ text }], config);
      console.log({ response });
      return response.data;
    } catch (err: any) {
      console.log(err);
      return null;
    }
  }
}
