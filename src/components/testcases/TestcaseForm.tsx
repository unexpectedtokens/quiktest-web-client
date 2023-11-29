"use client";
import { createTestcase } from "@/data/post/createTestcase";
import { updateTestcase } from "@/data/update/updateTestcase";
import { TestCase, TestCaseWithId, TestGroup } from "@/types";
import { Field, Form, Formik, FormikValues } from "formik";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export const TestcaseForm = ({
  testcase,
  groups,
}: {
  testcase?: TestCaseWithId;
  groups: TestGroup[];
}) => {
  const router = useRouter();

  const selectedGroup = useMemo(() => {
    if (testcase && testcase.testGroup) {
      return (
        groups.find((group) => group._id === testcase.testGroup)?._id ?? ""
      );
    }
    return "";
  }, [groups, testcase]);

  return (
    <Formik
      initialValues={{
        title: testcase?.title ?? "",
        expectReturnCode: testcase?.expectReturnCode.toString() ?? "",
        method: testcase?.request.method ?? "",
        route: testcase?.request.route ?? "/",
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
        if (testcase) {
          await updateTestcase(testcaseData, testcase._id);
        } else {
          await createTestcase(testcaseData);
        }

        router.push("/testcases");
      }}
    >
      <Form>
        <h3>{testcase ? "Update testcase" : "Create a new testcase"}</h3>
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

        {groups.length && (
          <>
            <label htmlFor="group">Group</label>
            <Field id="group" name="group" as="select">
              <option value=""></option>
              {groups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.title}
                </option>
              ))}
            </Field>
          </>
        )}
        <button type="submit">Create testcase</button>
      </Form>
    </Formik>
  );
};
