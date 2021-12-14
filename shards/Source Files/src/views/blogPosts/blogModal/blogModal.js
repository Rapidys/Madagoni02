import React from 'react';
import MyModal from "../../../components/MyModal/MyModal";
import {
  Button,
  Form,
  FormGroup,
  FormInput,
  FormTextarea
} from "shards-react";
import MySelect from "../../../MySelect/MySelect";


const BlogModal = ({newPostModal, onNewPostClose}) => {

  return (
    <MyModal
      open={newPostModal}
      onClose={onNewPostClose}
      maxWidth={'sm'}
    >

      <Form className="m-auto">
        <FormGroup>

          <MySelect
            defaultValue={'ტიპი'}
            options={[
              {id: 1, displayName: 'სამსახურეობრივი'},
              {id: 2, displayName: 'დასვენებები'},
              {id: 3, displayName: 'მოგზაურობა'},
            ]}


          />
        </FormGroup>
        <FormGroup>
          <FormInput id="#username" placeholder="სათაური" type={'text'}
          />
        </FormGroup>
        <FormGroup>
          <FormTextarea type="text" id="#description" placeholder="შინაარსი"


          />
        </FormGroup>
        <FormGroup>

          <div className="p-3 mt-3 border rounded">
            <div className="custom-file mb-3">
              <input type="file"
                     name="file"
                     className="custom-file-input"
                     id="customFile2"
              />
              <label className="custom-file-label" htmlFor="customFile2">
                აირჩიეთ სურათი...
              </label>

              <br/>

            </div>
          </div>
        </FormGroup>
        <Button theme="secondary"

        >
          შექმნა
        </Button>
      </Form>

    </MyModal>
  );
};

export default BlogModal;
