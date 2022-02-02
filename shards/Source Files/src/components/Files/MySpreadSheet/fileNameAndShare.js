import React from 'react';
import {Button, Form, FormInput, FormTextarea} from "shards-react";
import {Tooltip} from "@material-ui/core";
import ShearUsersModal from "../shearUsers/shearUsersModal";
import styled from "styled-components";

let Styles = styled.div`
  .forButtons {
    margin-left: 0.5rem;
  }

  .forButtons {
    @media (max-width: 477px) {
      display: block;
      margin-left: 0;
      margin-top: 5px;
    }
  }

`

const FileNameAndShare = ({
                            titleValue,
                            setTitleValue,
                            sharedUsers,
                            openTree,
                            closeTree,
                            data,
                            fileInfo,
                            open,
                            fileBody,
                            setFileBody
                          }) => {

  return (
    <Styles>


      <div className={'container'}>
        <div className={'row align-items-center'}>
          <Form className="col-8">
            <FormInput placeholder="სათაური"
                       id="#title"
                       className={'mb-4 w-50'}
                       value={titleValue}
                       onChange={(e) => setTitleValue(e.target.value)}
            />
            <FormTextarea placeholder="აღწერა"
                          id="#body"
                          className={'mb-4 w-75'}
                          size={'lg'}
                          value={fileBody}
                          onChange={(e) => setFileBody(e.target.value)}
            />
          </Form>

          <div className="col-4">
            <Tooltip
              title={<div style={{
                color: 'white',
                fontSize: '16px',
                padding: '5px',
              }}>{sharedUsers && sharedUsers.map((item, index) => {
                {
                  if (item.isActive === true) {
                    return <div className={'p-2'}
                                key={index}>{item.displayName}</div>
                  }
                }
              })}</div>}
            >
              <Button className={'btn-primary ml-2 float-right'}
                      onClick={openTree}
              >
                გაზიარება
              </Button>
            </Tooltip>


            <ShearUsersModal
              onClose={closeTree}
              open={open}
              titleValue={titleValue}
              data={data}
              fileInfo={fileInfo}
            />
          </div>
        </div>

      </div>

    </Styles>
  );
};

export default FileNameAndShare;
