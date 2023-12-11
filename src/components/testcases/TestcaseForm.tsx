"use client";
import { getGroups } from "@/data/get/getGroups";
import { getTestcase } from "@/data/get/getTestcase";
import { createTestcase } from "@/data/post/createTestcase";
import { updateTestcase } from "@/data/update/updateTestcase";
import { TestCase, TestCaseWithId, TestGroup } from "@/types";
import { Field, Form, Formik, FormikValues } from "formik";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";

export const TestcaseForm = ({ testcaseId }: { testcaseId?: string }) => {
  const router = useRouter();
  const client = useQueryClient();
  const groupsQuery = useQuery(["groups"], {
    queryFn: getGroups,
  });
  const testCaseQuery = useQuery(["case", testcaseId], {
    queryFn: () => getTestcase(testcaseId ?? ""),
    enabled: !!testcaseId,
  });

  console.log(testCaseQuery, testcaseId);
  const selectedGroup = useMemo(() => {
    if (
      testcaseId &&
      !testCaseQuery.isLoading &&
      testCaseQuery.data &&
      !groupsQuery.isLoading &&
      groupsQuery.data &&
      testCaseQuery.data.testGroup
    ) {
      return (
        groupsQuery.data.find(
          (group) => group._id === testCaseQuery.data.testGroup
        )?._id ?? ""
      );
    }
    return "";
  }, [testCaseQuery, groupsQuery]);

  return (
    !testCaseQuery.isLoading && (
      <Formik
        initialValues={{
          title: testCaseQuery.data?.title ?? "",
          expectReturnCode:
            testCaseQuery.data?.expectReturnCode.toString() ?? "",
          method: testCaseQuery.data?.request.method ?? "",
          route: testCaseQuery.data?.request.route ?? "/",
          group: selectedGroup,
        }}
        onSubmit={async (values: FormikValues) => {
          const testcaseData: TestCase = {
            title: values.title,
            expectReturnCode: parseInt(values.expectReturnCode),
            request: {
              route: values.route,
              method: values.method,
            },
            testGroup: values.group ?? "",
          };
          if (testCaseQuery.data) {
            await updateTestcase(testcaseData, testCaseQuery.data._id);
            client.invalidateQueries(["case", testcaseId]);
          } else {
            await createTestcase(testcaseData);
          }
          client.invalidateQueries(["cases"]);

          router.push("/testcases");
        }}
      >
        <Form>
          <h3>
            {!testCaseQuery.isIdle
              ? "Update testcase"
              : "Create a new testcase"}
          </h3>
          <label htmlFor="title">Testcase description</label>
          <Field id="title" name="title" placeholder="Title" required />

          <label htmlFor="expectedReturnCode">Expected status code</label>
          <Field
            id="expectReturnCode"
            name="expectReturnCode"
            placeholder="Expected status code"
            type="number"
            min={100}
            required
            max={599}
          />

          <label htmlFor="path">Endpoint</label>
          <Field id="route" name="route" placeholder="Path" required />
          <label htmlFor="method">HTTP Method</label>
          <Field id="method" name="method" placeholder="Method" required />

          {groupsQuery.isLoading ? (
            <p>loading</p>
          ) : (
            !!groupsQuery.data?.length && (
              <>
                <label htmlFor="group">Group (Optional)</label>
                <Field id="group" name="group" as="select">
                  <option value="">No group selected</option>
                  {groupsQuery.data.map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.title}
                    </option>
                  ))}
                </Field>
              </>
            )
          )}

          <button type="submit">
            {testCaseQuery.isIdle ? "Create testcase" : "Update testcase"}
          </button>
        </Form>
      </Formik>
    )
  );
};
