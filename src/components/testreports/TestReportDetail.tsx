import { TestReportWithCaseResults } from "@/types";
import { Card } from "../Card";
import { useQuery } from "react-query";
import getTestreportData from "@/data/get/getTestReport";

const TestReportDetail = ({
  initialData,
  reportId,
}: {
  initialData: TestReportWithCaseResults;
  reportId: string;
}) => {
  const { data } = useQuery<TestReportWithCaseResults>(
    ["testreport", reportId],
    {
      queryFn: () => getTestreportData(reportId),
      initialData: initialData,
    }
  );
  return (
    <>
      <h3 className="text-white mb-5">{data?.title}</h3>
      <div className="flex flex-col gap-5">
        {data?.tesCaseResults.map((testcaseresult) => (
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
    </>
  );
};

export default TestReportDetail;
