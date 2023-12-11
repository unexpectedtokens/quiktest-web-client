"use client";
import { TestReport } from "@/types";
import Link from "next/link";
import { useQuery } from "react-query";
import { Card } from "../Card";
import { MdCheck } from "react-icons/md";
import getTestReports from "@/data/get/getTestReports";

const TestReportsOverview = ({
  initialData,
}: {
  initialData: TestReport[];
}) => {
  const { data, isLoading } = useQuery<TestReport[]>(["reports"], {
    queryFn: getTestReports,
    staleTime: 10000,
    initialData,
  });
  return (
    <div className="flex flex-col gap-5">
      {!isLoading &&
        data?.map((testreport) => (
          <Link href={`/reports/${testreport._id}`} key={testreport._id}>
            <Card>
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
  );
};

export default TestReportsOverview;
