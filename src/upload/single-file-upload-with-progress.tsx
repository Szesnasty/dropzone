import { Grid, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FileHeader } from './file-header';

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function SingleFileUploadWithProgress({ file, onDelete, onUpload }: SingleFileUploadWithProgressProps) {
  const reader = new FileReader();

  const x = reader.readAsDataURL(file);
  console.log(x);
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

function uploadFile(singleFile: File, onProgress: (percentage: number) => void) {
  console.log(singleFile);
  return new Promise<string>((res, rej) => {
    const formData = new FormData();
    formData.append('file', singleFile);

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = +(+event.loaded / +event.total) * 100;
        onProgress(Math.round(percentage));
        console.log(percentage); // Update progress here
      }
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status !== 200) {
        console.log('error'); // Handle error here
      }
      console.log('success'); // Handle success here
    };
    xhr.open('', '', true);
    xhr.send(formData);
  });
}
