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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const base64File = await uploadFile(file, setProgress);
      onUpload(file, base64File);
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
    const reader = new FileReader();

    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        onProgress(Math.round(percent));
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });

    reader.addEventListener('load', (event) => {
      const result = event?.target?.result;
      console.log(result && btoa(result?.toString()));
      // Do something with result
    });
    return reader.readAsDataURL(singleFile);
  });
}
