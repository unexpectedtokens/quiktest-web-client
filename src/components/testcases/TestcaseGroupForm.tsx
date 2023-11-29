import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Modal } from "../modal/Modal";

export const TestcaseGroupForm = ({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal open={show}>
      <Formik
        initialValues={{
          groupTitle: "",
        }}
        onSubmit={async (values: FormikValues) => {
          await fetch("http://localhost:8080/api/testgroups", {
            method: "POST",
            body: JSON.stringify({
              title: values.groupTitle,
            }),
          });

          handleClose();
        }}
      >
        <Form>
          <h3>Create new group</h3>
          <label htmlFor="groupTitle">Group name</label>
          <Field id="groupTitle" name="groupTitle" placeholder="Group title" />
          <button type="submit">Create group</button>
        </Form>
      </Formik>
    </Modal>
  );
};
