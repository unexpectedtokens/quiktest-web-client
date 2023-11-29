import { TestCase } from "@/types";

export const createTestcase = async (testcase: TestCase): Promise<void> => {
  await fetch("http://localhost:8080/api/testcases", {
    method: "POST",
    body: JSON.stringify(testcase),
  });
};
