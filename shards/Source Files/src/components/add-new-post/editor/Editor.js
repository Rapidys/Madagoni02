import React, {useEffect, useMemo, useState} from "react";
import {
  Card,
  CardBody,
  Form,
  FormInput,
} from "shards-react";
import "react-quill/dist/quill.snow.css";
import "../../../assets/quill.css";
import {useDispatch, useSelector} from "react-redux";
import {
  isErrorAC,
  setNewObject,
} from "../../../Reducers/addNewPost/addNewPostReducer";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {
  setBlockedDocument,
  setRealoadDOCAC,
  setSignDocument
} from "../../../Reducers/signDocumentReducer";
import SideBarDestinations
  from "../sideBarAction/sideBarModalInfo/sideBarDestinations";
import {
  setIsUpdatedAC,
  updateDocument
} from "../../../Reducers/updateDocumentReducer";
import {setAddBtnAC, setIsFinishedAC} from "../../../Reducers/getDocReducer";
import API from "../../../API/ApiBases";
import GoBack from "../../../views/chosenDocument/MessagesPage/goBack";
import EditorInput from "./EditorInput/EditorInput";
import EditorModals from "./BtnModals/EditorModals";
import EditorButtons from "./editorButtons/EditorButtons";


const Editor = (props) => {

  useEffect(() => {
    dispatch(isErrorAC(false))
    dispatch(setRealoadDOCAC(false))
    dispatch(setIsUpdatedAC(false))
    dispatch(setIsFinishedAC(false))
    if (url === `/completedDocument/${params.id}`) {
      dispatch(setAddBtnAC(true))

    }
  }, [])

  let signatureDefaultValue = useSelector((state => state.ProfileInfo.signatureDefaultValue))
  let [signatureDefault, setSignatureDefault] = useState(signatureDefaultValue)

  let destinations = useSelector(state => state.updateDocument.destinations)
  let params = useParams()
  let history = useHistory()
  let url = history.location.pathname
  let getDoc = useSelector((state => state.GetDoc))
  let Motions = useSelector((state => state.docMotion))
  let selectType = useSelector((state => state.selectDocument.selectType))
  let fileId = useSelector((state => state.uploadFile.fileId))
  let isSended = useSelector((state => state.addNewPost.isSended))
  let isSendedDraft = useSelector((state => state.addNewPost.isSendedDraft))
  let [resendAddresant, setResendAddresant] = useState(false)
  let [successResended, setSuccessResended] = useState(false)
  let error = useSelector((state => state.addNewPost.error))

  let dispatch = useDispatch()

  let chosen = useSelector(state => state.chosenDocument.currentMessagePage)
  let isUpdatedDocument = useSelector((state => state.updateDocument.isUpdated))
  let signDocRel = useSelector((state => state.signDocument.reloadDoc))
  let isBlocked = useSelector((state => state.signDocument.isBlocked))


  const [openSign, setOpenSign] = useState(false)

  function addNewPost() {
    {
      Motions.MotionDest && Motions.MotionDest.map(motion => {
        motion.MotionStatusId = 2
      })
    }
    dispatch(setNewObject(Motions, selectType, props.documentBody, props.documentTitle, fileId))

  }

  let handleDraft = () => {

    {
      Motions.MotionDest && Motions.MotionDest.map(motion => {
        motion.MotionStatusId = 1
      })
    }

    dispatch(setNewObject(Motions, selectType, props.documentBody, props.documentTitle, fileId))
  }


  const handleBody = (e) => {
    props.setDocumentBody && props.setDocumentBody(e)
  }
  const handleTitle = (e) => {
    props.setDocumentTitle && props.setDocumentTitle(e.target.value)
  }

  // xelmoweris ambavi
  let onCloseSignature = () => {
    setOpenSign((e) => !e)
  }
  const setSignature = () => {
    dispatch(setSignDocument(Number(params.id), params.id))
  }
  useMemo(() => {
    if (signDocRel === true) {
      setOpenSign(true)
    }
  }, [signDocRel])


  // resend documentis ambavi
  useMemo(() => {
    if (isUpdatedDocument === true) {
      setSuccessResended(true)
    }
  }, [isUpdatedDocument])
  // resend documentis ambavi

  // xelmoweris ambavi

  let [finishCategories, setFinishCategories] = useState(false)
  let finishModal = () => {
    setFinishCategories((e) => !e)
  }
  //dokumentis gagzavnis da draftis mere shesabamisi redirect
  if (isSended) {
    return <Redirect to={'/sentDocuments'}/>
  }
  if (isSendedDraft) {
    return <Redirect to={'/draftDocuments'}/>
  }
  //dokumentis gagzavnis da draftis mere shesabamisi redirect


  let resendDocModal = () => {
    setResendAddresant(v => !v)
  }
  let onSuccessResend = () => {
    setSuccessResended(v => !v)
  }

// dokumentis gadagzavna moushenis chamatebit


  let resendDocument = () => {
    if (url === `/draftDocument/${params.id}`) {
      chosen.documentMotions = [...chosen.documentMotions, ...destinations]
      chosen.documentMotions[0].motionStatusId = 2
      chosen.documentId = 0
      API.newPostAPI(chosen).then(response => {
        dispatch(setIsUpdatedAC(true))
      })
    } else {
      chosen.documentMotions = [...chosen.documentMotions, ...destinations]
      dispatch(updateDocument(chosen, params.id))
    }
    setResendAddresant(false)

  }

  // reject document

  let rejectDocument = () => {
    dispatch(setBlockedDocument(params.id))
  }
  if (isBlocked === true) {
    return <Redirect to={'/canceled'}/>
  }


  return (
    <Card small className="mb-3">
      <CardBody>
        <Form className="add-new-post">
          <FormInput size="lg" className="mb-3" readOnly={props.titleReadOnly}
                     placeholder="დოკუმენტის სათაური"
                     value={props.documentTitle}
                     onChange={handleTitle}

          />


          <EditorInput
            documentBody={props.documentBody}
            handleBody={handleBody}
            readOnly={props.readOnly}
            signatureDefault={signatureDefault}
            setSignatureDefault={setSignatureDefault}
          />

          {/*success Modal after Send Doc and resend*/}

          <EditorModals
            successResended={successResended}
            onSuccessResend={onSuccessResend}
            openSign={openSign}
            onCloseSignature={onCloseSignature}
            finishCategories={finishCategories}
            finishModal={finishModal}
            setFinishCategories={setFinishCategories}
          />


        </Form>
        <div className={'mt-3'}>
          {
            url !== '/add-new-post'
            && <GoBack/>

          }


          <SideBarDestinations
            open={resendAddresant}
            handleClose={resendDocModal}
            resendDocument={resendDocument}
          />

          <EditorButtons
            addNewPost={addNewPost}
            getDoc={getDoc}
            resendDocModal={resendDocModal}
            handleDraft={handleDraft}
            setSignature={setSignature}
            rejectDocument={rejectDocument}
            finishModal={finishModal}
            draftBtn={props.draftBtn}
            chosenDestination={props.chosenDestination}

          />


        </div>

        {
          error === true &&
          <p className={'text-danger'}>
            შეყვანილი მონაცემები არ არის საკმარისი
          </p>
        }
      </CardBody>
    </Card>
  )
};


export default Editor;


