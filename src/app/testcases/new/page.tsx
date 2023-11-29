import { TestcaseForm } from "@/components/testcases/TestcaseForm";
import { getGroups } from "@/data/get/getGroups";

export default async function NewTestCasePage() {
  const groups = await getGroups();

  return <TestcaseForm groups={groups} />;
}
