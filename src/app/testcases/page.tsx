import { TestcaseOverview } from "@/components/testcases/TestcaseOverview";
import { testcasesGrouped } from "@/data/get/getTestcases";

export default async function TestCases() {
  const initialData = await testcasesGrouped();

  return (
    <main>
      <TestcaseOverview data={initialData} />
    </main>
  );
}
