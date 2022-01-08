import React, {useState} from "react";
import {
  Card,
  CardHeader,
  Button,
  FormGroup
} from "shards-react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import ReactCrop from "react-image-crop";
import MyModal from "../MyModal/MyModal";
import 'react-image-crop/dist/ReactCrop.css';
import userDefault from '../../assets/user.png'

let Styles = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    font-size: 1em;
    color: white;
    background-color: #007bff;
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 6px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #888888;
  }

  .inputfile:focus + label,
  .inputfile + label {
    cursor: pointer; /* "hand" cursor */
  }

  .choose {
    margin: 0 auto;
  }

  .uploadPlace {
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon {
    font-size: 30px;
    color: grey;
  }
`

const UserDetails = ({ProfileInfo}) => {

  let user = useSelector(state => state.Auth.currentUser)
  let [imgSrc, setImgSrc] = useState(null)
  let [open, setOpen] = useState(false)
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const [crop, setCrop] = useState({aspect: 1 / 1});
  let onClose = () => {
    setOpen(v => !v)
  }

  let handleFileChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]))
  }

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Img = canvas.toDataURL('image/jpeg')
    setResult(base64Img)
  }

  let uploadImg = () => {
    console.log(result)
  }

  return (
    <Card small className="mb-4 pt-3">
      <CardHeader className="border-bottom text-center">
        <div className="mb-3 mx-auto">
          <img
            className="rounded-circle"
            src={result ? result : userDefault}
            alt={user.name}
            style={{width: '130px', height: '130px'}}
          />
        </div>
        <h4
          className="mb-0">{`${ProfileInfo.firstName} ${ProfileInfo.lastName}`}</h4>
        <span className="text-muted d-block mb-2">{ProfileInfo.position}</span>
        <Button
          onClick={onClose}
        >
          ფოტოს ატვირთვა
        </Button>
        <MyModal
          open={open}
          onClose={onClose}
          fullWidth={false}
          maxWidth={'sm'}
          title={'სურათის ატვირთვა'}
        >
          <Styles>
            <div className={'wrapper'}>
              <div className={'uploadPlace'}>
                {imgSrc !== null
                  ?
                  <div>
                    <div>
                      <h6>არჩეული სურათი</h6>
                    </div>
                    <ReactCrop src={imgSrc} crop={crop}
                               onChange={setCrop}
                               onImageLoaded={setImage}
                    />
                  </div>
                  : <>
                    <i className="fas fa-cloud-upload-alt icon"/>
                    <div>
                      <h6>არჩეული სურათი</h6>
                    </div>
                  </>
                }
                {result &&
                  <div className={'mt-2 mb-3'}>
                    <img src={result} alt="result"
                         className="rounded-circle"
                         style={{width: '130px', height: '130px'}}

                    />

                  </div>
                }


              </div>

              <div>

              </div>
              <div className={'mt-2 w-100'}>
                <input type="file"
                       id="file"
                       name="file"
                       accept={'image/*'}
                       className="inputfile"
                       onChange={handleFileChange}
                />

                <label htmlFor="file">
                  <div className={'choose'}>
                    <span>აირჩიეთ</span>

                  </div>
                </label>

              </div>

            </div>
            <hr></hr>
            <div className={'d-flex justify-content-end'}>
              <Button
                onClick={getCroppedImg}
              >
                მოჭრა
              </Button>
              <Button className={'ml-3'}
                      onClick={uploadImg}
              >
                შენახვა
              </Button>
            </div>
          </Styles>

        </MyModal>

      </CardHeader>
      <div className={'ml-2'}>
        <h6>პირადი ინფორმაცია</h6>
      </div>
      <FormGroup className={'p-2'}>
        <label htmlFor="feAddress">დეპარტამენტი : </label>

        <span className={'ml-3'}>{ProfileInfo.department}</span>
        <br/>
        <label htmlFor="feAddress">თანამდებობა : </label>

        <span className={'ml-3'}>{ProfileInfo.position}</span>
      </FormGroup>
    </Card>

  )
};


export default UserDetails;
