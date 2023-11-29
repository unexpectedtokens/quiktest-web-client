import { TestcaseOverview } from "@/components/testcases/TestcaseOverview";
import { getGroups } from "@/data/get/getGroups";
import { testcasesGrouped } from "@/data/get/getTestcases";

export default async function TestCases() {
  const groups = await getGroups();
  const data = await testcasesGrouped(groups);

  return (
    <main>
      <TestcaseOverview data={data} />
    </main>
  );
}
