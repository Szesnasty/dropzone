import { Grid, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FileHeader } from './file-header';

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;

  setFiles: any;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function SingleFileUploadWithProgress({
  file,
  onDelete,

  setFiles,
}: SingleFileUploadWithProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const upload = () => {
      uploadFile(file, setProgress, setFiles);
    };

    upload();
  }, []);

  return (
    <Grid item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant="determinate" value={progress} />
    </Grid>
  );
}

function uploadFile(singleFile: File, onProgress: (percentage: number) => void, setFiles: any) {
  console.log(singleFile);

  const reader = new FileReader();
  reader.readAsDataURL(singleFile);
  reader.addEventListener('progress', (event) => {
    if (event.loaded && event.total) {
      const percent = (event.loaded / event.total) * 100;
      onProgress(Math.round(percent));
      console.log(`Progress: ${Math.round(percent)}`);
    }
  });

  reader.addEventListener('load', (event) => {
    const result = event?.target?.result;

    setFiles((curr: any[]) =>
      curr.map((fw) => {
        console.log(fw);
        if (fw.file === singleFile) {
          return { ...fw, remoteDocument: { bytes: result && btoa(result?.toString()), name: singleFile.name } };
        }
        return fw;
      }),
    );
    // Do something with result
  });
}
