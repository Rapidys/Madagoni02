import React, {useEffect, useMemo, useState} from "react";
import ReactQuill from "react-quill";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormInput
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
  setBlockedDocument, setIsBlockedAC,
  setRealoadDOCAC,
  setSignDocument
} from "../../../Reducers/signDocumentReducer";
import FinishButtonModal from "./BtnModals/FinishButtonModal";
import SignDocumentModal from "./BtnModals/signDocumentModal";
import SideBarDestinations
  from "../sideBarAction/sideBarModalInfo/sideBarDestinations";
import {
  setIsUpdatedAC,
  updateDocument
} from "../../../Reducers/updateDocumentReducer";
import MyModal from "../../MyModal/MyModal";
import {setAddBtnAC, setIsFinishedAC} from "../../../Reducers/getDocReducer";
import API from "../../../API/ApiBase";


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
                     placeholder="Your Post Title"
                     value={props.documentTitle}
                     onChange={handleTitle}

          />
          <ReactQuill
            readOnly={props.readOnly}
            className="add-new-post__editor mb-1"
            modules={Editor.modules}
            formats={Editor.formats}
            onChange={handleBody}
            value={props.documentBody || ''}

          />
          <MyModal
            open={successResended}
            onClose={onSuccessResend}
            maxWidth={'sm'}
          >
            <div className={'d-flex align-items-center'}>
              <i className="fas fa-check-circle"

                 style={{color: 'green', fontSize: '30px'}}/>
              <span className={'ml-2'}>
                          წარმატებით გადაიგზავნა
            </span>
            </div>

          </MyModal>
        </Form>
        <SideBarDestinations
          open={resendAddresant}
          handleClose={resendDocModal}
          resendDocument={resendDocument}
        />
        {url === '/add-new-post'
          ? <Button
            disabled={!Motions.MotionDest.length && true}
            onClick={addNewPost}
            className={getDoc.addBtn !== true ? 'd-none' : 'border - 1'}
          >გაგზავნა</Button>
          : <Button
            onClick={resendDocModal}
            className={getDoc.addBtn !== true ? 'd-none' : 'border - 1'}
          >გადაგზავნა</Button>
        }

        {/*"ml-lg-2 ml-sm-0 border - 1"*/}
        <Button
          disabled={!Motions.MotionDest.length && true}
          onClick={handleDraft}
          className={props.draftBtn}
        >დრაფტად შენახვა</Button>

        <Button
          className={getDoc.approveBtn !== true ? 'd-none' : 'border - 1'}
          onClick={setSignature}
        >
          ხელმოწერა
        </Button>

        <Button
          className={getDoc.cancel !== true ? 'd-none' : 'border - 1'}
          onClick={rejectDocument}
        >გაუქმება</Button>

        <SignDocumentModal
          openSign={openSign}
          closeSign={onCloseSignature}
        />


        <Button
          className={getDoc.finishDocument !== true ? 'd-none' : 'border - 1'}
          onClick={finishModal}
        >
          დავასრულე
        </Button>
        <FinishButtonModal finishCategories={finishCategories}
                           finishModal={finishModal}
                           setFinishCategories={setFinishCategories}
        />


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

Editor.modules = {
  toolbar: [
    [{header: '1'}, {header: '2'}, {header: [3, 4, 5, 6]}, {font: []}],
    [{size: []}],
    [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ]
}
Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block'
]
