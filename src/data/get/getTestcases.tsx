import { TestCaseWithId, TestGroup } from "@/types";
import { getGroups } from "./getGroups";

type GroupedTestcases = Record<string, TestCaseWithId[]>;

const NIL_ID = "000000000000000000000000";

const sortByGroup = (
  groups: TestGroup[],
  testcases: TestCaseWithId[]
): GroupedTestcases => {
  const output: Record<string, TestCaseWithId[]> = {};

  groups.forEach((group) => (output[group.title] = []));
  const ungrouped: TestCaseWithId[] = [];
  for (const testCase of testcases) {
    if (!testCase.testGroup || testCase.testGroup === NIL_ID) {
      ungrouped.push(testCase);
    } else {
      const group = groups.find(
        (groupItem) => groupItem._id === testCase.testGroup
      );
      if (!group) {
        ungrouped.push(testCase);
      } else {
        if (!output[group.title]) {
          output[group.title] = [];
        }
        output[group.title].push(testCase);
      }
    }
  }

  output.ungrouped = ungrouped;

  return output;
};

export type TestcasesGroupedOutput = {
  /** Testcases, grouped */
  groupedCases: GroupedTestcases;
  /** total numer of testcases */
  count: number;
};

export async function testcasesGrouped(): Promise<TestcasesGroupedOutput> {
  const groups = await getGroups();
  const res = await fetch("http://localhost:8080/api/testcases", {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const testcases = (await res.json()) as TestCaseWithId[];

  return {
    groupedCases: sortByGroup(groups, testcases),
    count: testcases.length,
  };
}
