import axios from "axios";

const expertAIToken = `${process.env.EXPERT_AI_TOKEN}`;
const config = {
  headers: {
    Authorization: `Bearer ${expertAIToken}`,
    "Content-type": "application/json",
  },
};

export class ExpertAI {
  static async analyze(text: string) {
    const [relevants, entiites, sentitment] = await Promise.all([
      this.getRelevants(text),
      this.getEntities(text),
      this.getSentiment(text),
    ]);

    return {
      relevants,
      entiites,
      sentitment,
    };
  }

  private static async getEntities(text: string): Promise<string[]> {
    try {
      const result = await axios.post(
        `https://nlapi.expert.ai/v2/analyze/standard/en/entities`,
        {
          document: {
            text,
          },
        },
        config
      );

      if (
        result &&
        result.data &&
        result.data.data &&
        result.data.data.entities &&
        result.data.data.entities.length
      ) {
        return result.data.data.entities.map((value: any) => value.lemma);
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  private static async getRelevants(text: string): Promise<{
    main: string[];
    tags: string[];
  }> {
    try {
      const result = await axios.post(
        `https://nlapi.expert.ai/v2/analyze/standard/en/relevants`,
        {
          document: {
            text,
          },
        },
        config
      );

      if (result && result.data && result.data.data) {
        const mainSentences = result.data.data.mainSentences.map(
          (value: any) => value.value
        );

        const tags = result.data.data.topics.map((value: any) => value.label);

        return {
          main: mainSentences,
          tags,
        };
      } else {
        return {
          main: [],
          tags: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        main: [],
        tags: [],
      };
    }
  }

  private static async getSentiment(text: string) {
    try {
      const result = await axios.post(
        `https://nlapi.expert.ai/v2/analyze/standard/en/sentiment`,
        {
          document: {
            text,
          },
        },
        config
      );

      if (
        result &&
        result.data &&
        result.data.data &&
        result.data.data.sentiment
      ) {
        return {
          overall: result.data.data.sentiment.overall,
          positive: result.data.data.sentiment.positivity,
          negative: result.data.data.sentiment.negativity,
        };
      } else {
        return {
          overall: 0,
          positive: 0,
          negative: 0,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        overall: 0,
        positive: 0,
        negative: 0,
      };
    }
  }
}
