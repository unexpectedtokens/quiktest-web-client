import { TestReport, TestReportWithCaseResults } from "@/types";
import { Card } from "../../../components/Card";
import { MdCheck } from "react-icons/md";
import Link from "next/link";
async function getTestreportData(reportId: string) {
  const res = await fetch(`http://localhost:8080/api/testreports/${reportId}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data: TestReportWithCaseResults = await res.json();

  const resCaseResults = await fetch(
    `http://localhost:8080/api/testreports/${reportId}/results`
  );

  if (!resCaseResults.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  data.tesCaseResults = await resCaseResults.json();

  return data;
}

export default async function TestCases({
  params,
}: {
  params: { id: string };
}) {
  const data: TestReportWithCaseResults = await getTestreportData(params.id);
  console.log(data);
  return (
    <main>
      <h3 className="text-white mb-5">{data.title}</h3>
      <div className="flex flex-col gap-5">
        {data.tesCaseResults.map((testcaseresult) => (
          <Card key={testcaseresult._id}>
            <div className="flex justify-between items-center">
              <p className="text-white flex justify-start items-center">
                <span className="bg-emerald-300 p-2 mr-5 rounded text-xs text-emerald-600">
                  {testcaseresult.case.request.method}
                </span>
                <span className="text-sm text-slate-300 p-2 bg-slate-800 rounded">
                  {testcaseresult.case.request.route}
                </span>
              </p>
              <p className="text-lg">
                {testcaseresult.errorMessages.length ? (
                  <span className="bg-red-300 p-2 text-red-600 rounded">
                    Fail
                  </span>
                ) : (
                  <span className="bg-emerald-300 text-emerald-600 p-2 rounded">
                    Pass
                  </span>
                )}
              </p>
            </div>
            <p className="mt-5 text-white">{testcaseresult.case.title}</p>

            <div className="bg-slate-800 p-2 mt-5 rounded text-slate-300">
              <h5 className="border-b-2 border-b-slate-700">Errors:</h5>
              <ul className="pl-2">
                {testcaseresult.errorMessages.map((errMessage) => (
                  <li key={errMessage}>{errMessage}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
