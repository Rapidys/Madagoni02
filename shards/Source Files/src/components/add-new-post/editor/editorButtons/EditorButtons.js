import React from 'react';
import {Button} from "shards-react";
import {useHistory, useParams} from "react-router-dom";

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
  let params = useParams()

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

      {
        url === `/incomingDocument/${params.id}` &&
        <Button
          className={'border - 1 float-right btn-warning  mr-1'}
        >გავეცანი</Button>
      }

      {/*"ml-lg-2 ml-sm-0 border - 1"*/}
      <Button
        disabled={!chosenDestination.length && true}
        onClick={handleDraft}
        className={`${props.draftBtn} mr-1`}
      >დრაფტად შენახვა</Button>

      <Button
        className={getDoc.approveBtn !== true ? 'd-none' : 'border - 1 float-right'}
        onClick={setSignature}
      >
        ხელმოწერა
      </Button>

      <Button
        className={getDoc.cancel !== true ? 'd-none' : 'border - 1 float-right mr-1'}
        onClick={rejectDocument}
      >გაუქმება</Button>


      <Button
        className={getDoc.finishDocument !== true ? 'd-none' : 'border - 1 float-right btn-success mr-1'}
        onClick={finishModal}
      >
        დავასრულე
      </Button>
    </div>
  );
};

export default EditorButtons;
