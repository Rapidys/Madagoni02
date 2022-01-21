import React from 'react';
import ReactEditor from "../../../ReactQuill/ReactEditor";
import {Col, Container, FormTextarea, Row} from "shards-react";
import defaultImg from "../../../../assets/signature.jpg";
import styled from "styled-components";
import {useHistory} from "react-router-dom";


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


const EditorInput = ({
                       handleBody,
                       signatureDefault,
                       setSignatureDefault,
                       ...props
                     }) => {

  let history = useHistory()
  let url = history.location.pathname

  return (
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
                readOnly={true}
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
  );
};

export default EditorInput;
