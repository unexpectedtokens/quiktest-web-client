"use client";

import { TestcaseGroupForm } from "./TestcaseGroupForm";
import Link from "next/link";
import { TestcaseCard } from "./TestcaseCard";
import { useState } from "react";
import {
  TestcasesGroupedOutput,
  testcasesGrouped,
} from "@/data/get/getTestcases";
import { useQuery } from "react-query";

export const TestcaseOverview = ({
  data,
}: {
  data: TestcasesGroupedOutput;
}) => {
  const [showTestGroupCreateForm, setShowTestGroupCreateForm] = useState(false);
  const query = useQuery(["cases"], {
    queryFn: testcasesGrouped,
    initialData: data,
  });

  if (query.isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <TestcaseGroupForm
        show={showTestGroupCreateForm}
        handleClose={() => setShowTestGroupCreateForm(false)}
      />

      <div className="flex justify-between items-center mb-5">
        <h3 className="text-white text-lg">Testcases ({query.data?.count})</h3>
        <div className="flex gap-5 items-center">
          <button
            className="btn"
            onClick={() => setShowTestGroupCreateForm(true)}
          >
            + Create new group
          </button>
          <Link href="/testcases/new" className="btn">
            + Create new testcase
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {Object.keys(query.data!.groupedCases).map((groupKey) => {
          const cases = query.data!.groupedCases[groupKey];
          return (
            <div key={groupKey}>
              <h5 className="capitalize text-lg text-slate-50 mb-5 bg-slate-850">
                {groupKey} ({cases.length})
              </h5>
              <div className="flex flex-col gap-5">
                {cases.map((testcase) => (
                  <TestcaseCard key={testcase._id} testcase={testcase} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
