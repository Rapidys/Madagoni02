import React, {useState} from 'react';
import {TextField} from "@mui/material";
import ExecutorField from "./documentFilter/searchInput/Fields/executorField";

const Executor = ({executor}) => {

  let [executorModal, setExecutorModal] = useState(false)

  let onCloseExecutor = () => {
    setExecutorModal(v => !v)
  }
  return (
    <>
      <TextField type="text" onClick={onCloseExecutor}
                 placeholder={'დეპარტამენტი'}
                 id="outlined-basic"
                 variant="outlined"
                 value={executor.displayName}
                 label={!executor.displayName && 'შემსრულებელი'}
      />

      <ExecutorField
        onCloseExecutor={onCloseExecutor}
        executor={executorModal}
        setExecutorModal={setExecutorModal}

      />
    </>
  );
};

export default Executor;
