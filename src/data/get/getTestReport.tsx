import { TestReportWithCaseResults } from "@/types";

export default async function getTestreportData(reportId: string) {
  const res = await fetch(`http://localhost:8080/api/testreports/${reportId}`, {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data: TestReportWithCaseResults = await res.json();

  const resCaseResults = await fetch(
    `http://localhost:8080/api/testreports/results?testReportId=${reportId}`,
    { cache: "no-store" }
  );

  if (!resCaseResults.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  data.tesCaseResults = await resCaseResults.json();

  return data;
}
