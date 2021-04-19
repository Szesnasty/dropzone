import { Grid, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FileHeader } from './file-header';

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}

export function SingleFileUploadWithProgress({ file, onDelete, onUpload }: SingleFileUploadWithProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress);
      onUpload(file, url);
    }

    upload();
  }, []);

  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={progress} />
    </Grid>
  );
}

function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
  const key = 'docs_upload_example_us_preset';

  // const formData = new FormData();
  // for (const file of acceptedFiles) formData.append('file', file);

  // const xhr = new XMLHttpRequest();
  // xhr.upload.onprogress = event => {
  //  const percentage = parseInt((event.loaded / event.total) * 100);
  //  console.log(percentage); // Update progress here
  // };
  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState !== 4) return;
  //   if (xhr.status !== 200) {
  //    console.log('error'); // Handle error here
  //   }
  //    console.log('success'); // Handle success here
  // };
  // xhr.open('POST', 'https://httpbin.org/post', true);
  // xhr.send(formData);

  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', key);

    xhr.send(formData);
  });
}
