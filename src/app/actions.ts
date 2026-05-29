"use server";

import { explainMathConcept, getMathHint } from "@/lib/claude";

export async function explainAction(concept: string, context: string = "") {
  try {
    return await explainMathConcept(concept, context);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("AI Explanation Error:", message);
    throw new Error(`AI 설명을 가져오는 데 실패했습니다: ${message}`);
  }
}

export async function getHintAction(problem: string, currentStep: string = "") {
  try {
    return await getMathHint(problem, currentStep);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("AI Hint Error:", message);
    throw new Error(`AI 힌트를 가져오는 데 실패했습니다: ${message}`);
  }
}
