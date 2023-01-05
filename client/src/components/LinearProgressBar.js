import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography } from '@material-ui/core';

export default function LinearProgressBar({ value }) {
  const [progress, setProgress] = React.useState(value);

  React.useEffect(() => {
    setProgress(value);
  }, [value]);

  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <LinearProgress variant='determinate' value={progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2' color='textSecondary'>{`${Math.round(
          progress
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
