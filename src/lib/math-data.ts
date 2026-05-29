export interface MathConcept {
  id: string;
  title: string;
  summary: string;
  grade: "고1" | "고2";
  category: string;
  details: string; // Detailed content for AI to reference if needed
}

export const mathCurriculum: MathConcept[] = [
  // Grade 10 (고1)
  {
    id: "poly-1",
    title: "다항식의 연산",
    summary: "다항식의 덧셈, 뺄셈, 곱셈과 나눗셈의 원리를 이해합니다.",
    grade: "고1",
    category: "다항식",
    details: "다항식의 정의, 전개식, 조립제법 등을 포함합니다."
  },
  {
    id: "eq-1",
    title: "이차방정식과 판별식",
    summary: "이차방정식의 해의 개수를 판별하는 식 D의 성질을 배웁니다.",
    grade: "고1",
    category: "방정식과 부등식",
    details: "근의 공식, 실근과 허근, 판별식 D=b^2-4ac의 활용."
  },
  {
    id: "geom-1",
    title: "원의 방정식",
    summary: "좌표평면 위에서 원을 나타내는 식을 유도하고 성질을 탐구합니다.",
    grade: "고1",
    category: "도형의 방정식",
    details: "(x-a)^2 + (y-b)^2 = r^2 원의 중심과 반지름."
  },
  // Grade 11 (고2)
  {
    id: "log-1",
    title: "로그의 정의와 성질",
    summary: "지수의 역연산인 로그의 개념을 익히고 계산 법칙을 배웁니다.",
    grade: "고2",
    category: "지수와 로그",
    details: "log_a(x)의 정의 조건, 밑 변환 공식 등."
  },
  {
    id: "diff-1",
    title: "미분계수와 도함수",
    summary: "함수의 변화율을 나타내는 미분의 개념을 이해합니다.",
    grade: "고2",
    category: "미분",
    details: "평균변화율, 순간변화율, 미분법 공식."
  },
  {
    id: "int-1",
    title: "정적분의 활용",
    summary: "정적분을 이용하여 곡선으로 둘러싸인 넓이를 구합니다.",
    grade: "고2",
    category: "적분",
    details: "구분구적법, 정적분과 넓이의 관계."
  }
];
