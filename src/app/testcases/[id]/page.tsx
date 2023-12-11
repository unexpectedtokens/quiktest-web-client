import { TestcaseForm } from "@/components/testcases/TestcaseForm";
import { getGroups } from "@/data/get/getGroups";
import { getTestcase } from "@/data/get/getTestcase";

export default async function UpdateTestCasePage({
  params,
}: {
  params: { id: string };
}) {
  return <TestcaseForm testcaseId={params.id} />;
}
