import { TestCase } from "@/types";

export const updateTestcase = async (
  testcase: TestCase,
  id: string
): Promise<void> => {
  await fetch(`http://localhost:8080/api/testcases/${id}`, {
    method: "PUT",
    body: JSON.stringify(testcase),
  });
};
