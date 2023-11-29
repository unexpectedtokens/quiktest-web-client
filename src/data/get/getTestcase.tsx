import { TestCaseWithId } from "@/types";

export const getTestcase = async (id: string): Promise<TestCaseWithId> => {
  const testcase = await fetch(`http://localhost:8080/api/testcases/${id}`, {
    cache: "no-store",
  });

  console.log(testcase.status);

  return testcase.json();
};
