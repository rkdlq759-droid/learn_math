"use server";

import { explainMathConcept, getMathHint } from "@/lib/claude";

export async function explainAction(concept: string, context: string = "") {
  try {
    return await explainMathConcept(concept, context);
  } catch (error) {
    console.error("AI Explanation Error:", error);
    throw new Error("AI 설명을 가져오는 데 실패했습니다.");
  }
}

export async function getHintAction(problem: string, currentStep: string = "") {
  try {
    return await getMathHint(problem, currentStep);
  } catch (error) {
    console.error("AI Hint Error:", error);
    throw new Error("AI 힌트를 가져오는 데 실패했습니다.");
  }
}
