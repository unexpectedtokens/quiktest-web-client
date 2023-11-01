import { TestCaseWithId } from "@/types";
import { Card } from "../../components/Card";
import Link from "next/link";

async function getTestcases() {
  const res = await fetch("http://localhost:8080/api/testcases", {
    next: {
      tags: ["testcases"],
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function TestCases() {
  const data: TestCaseWithId[] = await getTestcases();
  return (
    <main>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-white mb-5">Testcases ({data.length})</h3>
        <Link href="/testcases/new" className="btn">
          Create new testcase
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        {data.map((testcase) => (
          <Card key={testcase._id}>
            <p className="text-white flex justify-start items-center">
              <span className="bg-emerald-300 p-2 mr-5 rounded text-xs text-emerald-600">
                {testcase.request.method}
              </span>
              <span className="text-sm text-slate-300 p-2 bg-slate-900 shadow-inner rounded">
                {testcase.request.route}
              </span>
            </p>
            <p className="mt-5 text-white">{testcase.title}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
