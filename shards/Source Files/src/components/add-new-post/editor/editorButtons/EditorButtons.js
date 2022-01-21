import React from 'react';
import {Button} from "shards-react";
import {useHistory} from "react-router-dom";

const EditorButtons = ({
                         addNewPost,
                         getDoc,
                         resendDocModal,
                         handleDraft,
                         setSignature,
                         rejectDocument,
                         finishModal,
                         chosenDestination,
                         ...props
                       }) => {

  let history = useHistory()
  let url = history.location.pathname

  return (
    <div>
      {url === '/add-new-post'
        ? <Button
          disabled={!chosenDestination.length && true}
          onClick={addNewPost}
          className={getDoc.addBtn !== true ? 'd-none' : 'border - 1  float-right'}
        >გაგზავნა</Button>
        : <Button
          onClick={resendDocModal}
          className={getDoc.addBtn !== true ? 'd-none' : 'border - 1 float-right'}
        >გადაგზავნა</Button>
      }

      {/*"ml-lg-2 ml-sm-0 border - 1"*/}
      <Button
        disabled={!chosenDestination.length && true}
        onClick={handleDraft}
        className={props.draftBtn}
      >დრაფტად შენახვა</Button>

      <Button
        className={getDoc.approveBtn !== true ? 'd-none' : 'border - 1 float-right'}
        onClick={setSignature}
      >
        ხელმოწერა
      </Button>

      <Button
        className={getDoc.cancel !== true ? 'd-none' : 'border - 1 float-right'}
        onClick={rejectDocument}
      >გაუქმება</Button>


      <Button
        className={getDoc.finishDocument !== true ? 'd-none' : 'border - 1 float-right'}
        onClick={finishModal}
      >
        დავასრულე
      </Button>
    </div>
  );
};

export default EditorButtons;
