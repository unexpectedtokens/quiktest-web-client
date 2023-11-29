import { TestcaseForm } from "@/components/testcases/TestcaseForm";
import { getGroups } from "@/data/get/getGroups";
import { getTestcase } from "@/data/get/getTestcase";

export default async function UpdateTestCasePage({
  params,
}: {
  params: { id: string };
}) {
  const testcase = await getTestcase(params.id);
  const groups = await getGroups();
  return <TestcaseForm testcase={testcase} groups={groups} />;
}
