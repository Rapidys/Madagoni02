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
  setNewObject,
} from "../../../Reducers/addNewPost/addNewPostReducer";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {setSignDocument} from "../../../Reducers/signDocumentReducer";
import FinishButtonModal from "./BtnModals/FinishButtonModal";
import SignDocumentModal from "./BtnModals/signDocumentModal";
import FinishMessage from "./BtnModals/finishMessage";
import SideBarDestinations
  from "../sideBarAction/sideBarModalInfo/sideBarDestinations";
import {updateDocument} from "../../../Reducers/updateDocumentReducer";
import MyModal from "../../MyModal/MyModal";
import {getMessagePage} from "../../../API/sentDocumentService";


const Editor = (props) => {

  let destinations = useSelector(state => state.updateDocument.destinations)

  let params = useParams()
  let history = useHistory()
  let url = history.location.pathname
  let getDoc = useSelector((state => state.GetDoc))
  let Motions = useSelector((state => state.docMotion))
  let selectType = useSelector((state => state.selectDocument.selectType))
  let fileId = useSelector((state => state.uploadFile.fileId))
  let isSended = useSelector((state => state.addNewPost.isSended))
  let [resendAddresant, setResendAddresant] = useState(false)
  let [successResended, setSuccessResended] = useState(false)
  let dispatch = useDispatch()

  let chosen = useSelector(state => state.chosenDocument.currentMessagePage)


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
  const setSignature = () => {
    dispatch(setSignDocument(Number(params.id)))
    setOpenSign((e) => !e)
  }


  let [finishCategories, setFinishCategories] = useState(false)
  let finishModal = () => {
    setFinishCategories((e) => !e)
  }


  if (isSended) {
    return <Redirect to={'/sentDocuments'}/>

  }

  let resendDocModal = () => {
    setResendAddresant(v => !v)

  }
  let onSuccessResend = () => {
    setSuccessResended(v => !v)

  }

// dokumentis gadagzavna moushenis chamatebit

  let resendDocument = () => {
    chosen.documentMotions = [...chosen.documentMotions, ...destinations]

    dispatch(updateDocument(chosen))

    setResendAddresant(false)
    setSuccessResended(true)
    if (successResended === false) {
      dispatch(getMessagePage(params.id))

    }
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
        >გაუქმება</Button>

        <SignDocumentModal
          openSign={openSign}
          closeSign={setSignature}
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
        <FinishMessage/>


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
