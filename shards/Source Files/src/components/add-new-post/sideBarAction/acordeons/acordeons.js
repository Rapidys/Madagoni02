import React, {useState} from 'react';
import {
  Button,
  Collapse,
} from "shards-react";
import SelectDocumentType from "./selectDocumentType";
import AttachedFiles from "./attachedFiles/attachedFiles";
import styled from "styled-components";

let Styles = styled.div`
  .alignIt {
    text-align: center;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  }
`

const Accordeons = (props) => {


  let [mainInfo, setMainInfo] = useState(true)
  let [attachedFiles, setAttachedFiles] = useState(false)

  let attachedFilesToggle = () => {
    setAttachedFiles((c) => !c);

  }


  return (
    <Styles>
      <div className={"acordWrapper"}>

        <div className={"mb-1"}>
          <Button
            className={"w-100"}>ძირითადი ინფორმაცია</Button>
          <Collapse open={mainInfo}>
            <div className="p-1 mt-3 border rounded">

              <div className={'p-2'}>
                <div className={"mt-3 alignIt"}>{props.Date && props.Date}</div>
                <div
                  className={"mt-3 alignIt"}>{props.docId && props.docId}</div>
              </div>
              <SelectDocumentType documentType={props.documentType}/>

            </div>
          </Collapse>


        </div>

        <div className={"mb-1"}>
          <Button onClick={attachedFilesToggle}
                  className={"w-100"}>მიბმული ფაილები</Button>
          <AttachedFiles
            attachedFiles={attachedFiles}
          />
        </div>


      </div>
    </Styles>


  );
};

export default Accordeons;
