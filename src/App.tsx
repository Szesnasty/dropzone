import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { array, object, string } from 'yup';
import { MultipleFileUploadField } from './upload/multiple-file-upload-field';

import './App.css';

type InitialDataModel = {
  files: { bytes: string; name: string }[];
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const App = () => {
  return (
    <Card>
      <CardContent>
        <Formik<InitialDataModel>
          initialValues={{ files: [] }}
          validationSchema={object({
            files: array(
              object({
                remoteDocument: object({
                  bytes: string().required(),
                  name: string().required(),
                }),
              }),
            ),
          })}
          onSubmit={(values) => {
            console.log(
              'documents',
              values.files.map((x) => {
                return { bytes: x.bytes, name: x.name };
              }),
            );
            return new Promise((res) => setTimeout(res, 2000));
          }}
        >
          {({ values, errors, isValid, isSubmitting }) => (
            <Form>
              <Grid container spacing={2} direction="column">
                <MultipleFileUploadField name="files" />

                <Grid item>
                  <Button variant="contained" color="primary" disabled={!isValid || isSubmitting} type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>

              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default App;
