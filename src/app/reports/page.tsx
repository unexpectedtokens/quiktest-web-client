import { TestReport } from "@/types";
import TestReportsOverview from "@/components/testreports/TestReportsOverview";
import getTestReports from "@/data/get/getTestReports";

export default async function TestCases() {
  const data: TestReport[] = await getTestReports();
  return (
    <main>
      <h3 className="text-white mb-5">Testreports ({data.length})</h3>
      <TestReportsOverview initialData={data} />
    </main>
  );
}
