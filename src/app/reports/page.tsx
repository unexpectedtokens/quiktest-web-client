import { TestReport } from "@/types";
import { Card } from "../../components/Card";
import { MdCheck } from "react-icons/md";
import Link from "next/link";
async function getTestReports() {
  const res = await fetch("http://localhost:8080/api/testreports", {
    next: {
      tags: ["reports"],
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
  const data: TestReport[] = await getTestReports();
  console.log(data);
  return (
    <main>
      <h3 className="text-white mb-5">Testreports ({data.length})</h3>
      <div className="flex flex-col gap-5">
        {data.map((testreport) => (
          <Link href={`/reports/${testreport._id}`} key={testreport._id}>
            <Card>
              {/* {JSON.stringify(testreport)} */}

              <div className="flex text-white items-center justify-between">
                <div>
                  <h3 className="text-white">{testreport.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-green-400">
                    <MdCheck />
                  </span>
                  <p>{testreport.successPercentage}%</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
