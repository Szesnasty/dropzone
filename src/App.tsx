import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { array, object, string } from 'yup';
import { MultipleFileUploadField } from './upload/multiple-file-upload-field';

import './App.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const App = () => {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={{ files: [] }}
          validationSchema={object({
            files: array(
              object({
                filename: string().required(),
                path: string().required(),
                fileSize: string().required(),
                base64File: string().required(),
                type: string(),
              }),
            ),
          })}
          onSubmit={(values) => {
            console.log('values', values);
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
