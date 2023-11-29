"use client";
import { TestCaseWithId } from "@/types";
import { Card } from "../Card";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const TestcaseCard = ({ testcase }: { testcase: TestCaseWithId }) => {
  const router = useRouter();
  const handleDeleteAction = async (_id: string) => {
    await fetch(`http://localhost:8080/api/testcases/${_id}`, {
      method: "DELETE",
    });

    router.refresh();
  };
  return (
    <Card key={testcase._id}>
      <div className="flex justify-between">
        <div>
          <p className="text-white flex justify-start items-center">
            <span className="bg-emerald-300 p-2 mr-5 rounded text-xs text-emerald-600">
              {testcase.request.method}
            </span>
            <span className="text-sm text-slate-300 p-2 bg-slate-900 shadow-inner rounded">
              <span className="font-bold text-orange-400 text-sm">
                {"{{URL}}"}
              </span>
              {testcase.request.route}
            </span>
          </p>
          <div className="text-slate-300">
            <p className="mt-5">
              Should return a{" "}
              <span className="font-bold">{testcase.expectReturnCode}</span>
            </p>
            <p className="mt-5">{testcase.title}</p>
          </div>
        </div>
        <div className="text-white gap-2 flex items-start">
          <Link href={`/testcases/${testcase._id}`}>
            <MdEdit />
          </Link>
          <button onClick={() => handleDeleteAction(testcase._id)}>
            <MdDelete />
          </button>
        </div>
      </div>
    </Card>
  );
};
