"use client";
import { TestCase } from "@/types";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

type FormValues = {
  title: string;
  expectReturnCode: string;
  method: string;
  route: string;
};

export default function NewTestCasePage() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        title: "",
        expectReturnCode: "",
        method: "",
        route: "",
      }}
      onSubmit={async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
      ) => {
        const res = await fetch("http://localhost:8080/api/testcases", {
          method: "POST",
          body: JSON.stringify({
            title: values.title,
            expectReturnCode: parseInt(values.expectReturnCode),
            request: {
              route: values.route,
              method: values.method,
            },
          } as TestCase),
        });

        console.log(res);

        // revalidateTag("testcases");
        router.push("/testcases");

        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      <Form>
        <h3>Create a new testcase</h3>
        <label htmlFor="title">Testcase description</label>
        <Field id="title" name="title" placeholder="Title" />

        <label htmlFor="expectedReturnCode">Expected status code</label>
        <Field
          id="expectReturnCode"
          name="expectReturnCode"
          placeholder="Expected status code"
          type="number"
          min={100}
          max={599}
        />

        <label htmlFor="path">Endpoint</label>
        <Field id="route" name="route" placeholder="Path" />
        <label htmlFor="method">HTTP Method</label>
        <Field id="method" name="method" placeholder="Method" />
        <button type="submit">Create testcase</button>
      </Form>
    </Formik>
  );
}
