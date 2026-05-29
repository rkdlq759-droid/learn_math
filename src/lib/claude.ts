import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-haiku-4-5-20251001";

function createAnthropicClient() {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY is not configured on the server");

  return new Anthropic({
    apiKey,
    defaultHeaders: {
      "anthropic-version": "2023-06-01",
    },
  });
}

export async function explainMathConcept(concept: string, context: string = "") {
  const anthropic = createAnthropicClient();

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1500,
    system: "당신은 고등학생을 위한 친절한 수학 튜터입니다.",
    messages: [
      {
        role: "user",
        content: `다음 개념에 대해 설명해주세요: "${concept}"
${context ? `맥락: ${context}` : ""}

설명 지침:
1. 고등학교 1, 2학년 수준에 맞춰 쉽게 설명하세요.
2. 실생활 예시나 직관적인 비유를 들어주세요.
3. 수식은 LaTeX 형식(예: $x^2 + y^2 = r^2$)으로 작성하세요.
4. 마지막에 이 개념을 이해했는지 확인할 수 있는 간단한 질문을 하나 던져주세요.
5. 어조는 부드럽고 격려하는 느낌이어야 합니다.`
      }
    ]
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}

export async function getMathHint(problem: string, currentStep: string = "") {
  const anthropic = createAnthropicClient();

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1000,
    system: "당신은 고등학생을 위한 친절한 수학 튜터입니다. 정답을 바로 알려주지 말고 힌트를 유도하세요.",
    messages: [
      {
        role: "user",
        content: `다음 수학 문제의 풀이 힌트를 주세요.
문제: "${problem}"
현재 진행 상황: "${currentStep}"

지침:
1. 문제에서 사용해야 할 주요 공식이나 개념을 언급하세요.
2. 첫 번째 단계로 무엇을 해야 할지 질문 형태로 던져보세요.
3. 수식은 LaTeX 형식을 사용하세요.`
      }
    ]
  });

  return response.content[0].type === "text" ? response.content[0].text : "";
}
