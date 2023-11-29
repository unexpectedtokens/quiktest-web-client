import { TestGroup } from "@/types";

export const getGroups = async (): Promise<TestGroup[]> => {
  const testcase = await fetch(`http://localhost:8080/api/testgroups`, {
    cache: "no-store",
  });

  console.log(testcase.status);

  return testcase.json();
};
