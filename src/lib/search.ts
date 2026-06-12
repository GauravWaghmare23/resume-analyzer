import { chunkText } from "./chunk";
import { embed } from "./embed";
import { chunksStore } from "./store";
import { cosineSimilarity } from "./cosine";

export async function processResume(
  resumeText: string
) {
  chunksStore.length = 0;

  const chunks =
    chunkText(resumeText);

  for (const chunk of chunks) {
    const embedding =
      await embed(chunk);

    chunksStore.push({
      text: chunk,
      embedding,
    });
  }
}


export async function searchResume(
  query: string
) {
  const queryEmbedding =
    await embed(query);

  const results =
    chunksStore.map((chunk) => ({
      text: chunk.text,
      score: cosineSimilarity(
        queryEmbedding,
        chunk.embedding
      ),
    }));

  results.sort(
    (a, b) => b.score - a.score
  );

  return results.slice(0, 5);
}