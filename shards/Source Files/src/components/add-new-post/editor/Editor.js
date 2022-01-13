import React, {useEffect, useMemo, useState} from "react";
import {
  Button,
  Card,
  CardBody, Col, Container,
  Form,
  FormInput, FormTextarea, Row
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
import GoBack from "../../../views/chosenDocument/MessagesPage/goBack";
import styled from "styled-components";
import ReactEditor from "../../ReactQuill/ReactEditor";
import defaultImg from '../../../assets/signature.jpg'

let Styles = styled.div`
  .signatureInput {
    border: 1px solid #e1e5eb;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 60px;
    border-top: none;
    outline: none;
    height: auto;
  }

  textarea[readonly] {
    background-color: transparent;
  }
`

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
          <Styles>
            {
              url !== '/add-new-post'
                ? <>
                  <ReactEditor
                    readOnly={props.readOnly}
                    className="add-new-post__editor mb-1 editorWrapp border-0"
                    onChange={handleBody}
                    value={props.documentBody || ''}

                  />
                </>
                : <ReactEditor
                  readOnly={props.readOnly}
                  className="add-new-post__editor editorWrapp"
                  onChange={handleBody}
                  value={props.documentBody || ''}

                />


            }
            {
              url !== '/add-new-post' &&
              <Container>
                <Row>
                  <Col md='8' className={'p-0'}>
                    <FormTextarea
                      style={{
                        height: '100px',
                        border: 'none',
                        resize: 'none',

                      }}
                      className={'signatureInput'}
                      value={signatureDefault || ''}
                      onChange={(e) => setSignatureDefault(e.target.value)}
                    />
                  </Col>
                  <Col md='4' className={'p-0'}>
                    <FormTextarea
                      style={{
                        height: '100px',
                        backgroundImage: `url(${defaultImg})`,
                        border: 'none',
                        resize: 'none',
                      }}
                      className={'signatureInput'}
                      readOnly={true}
                    />
                  </Col>


                </Row>
              </Container>


            }

          </Styles>


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
          {url === '/add-new-post'
            ? <Button
              disabled={!Motions.MotionDest.length && true}
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
            disabled={!Motions.MotionDest.length && true}
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

          <SignDocumentModal
            openSign={openSign}
            closeSign={onCloseSignature}
          />


          <Button
            className={getDoc.finishDocument !== true ? 'd-none' : 'border - 1 float-right'}
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
        </div>


      </CardBody>
    </Card>
  )
};


export default Editor;


