import React, {useState} from 'react';
import {Button} from "shards-react";
import MyModal from "../MyModal/MyModal";
import styled from "styled-components";
import ReactCrop from "react-image-crop";
import {uploadFile} from "../../Reducers/addNewPost/UploadFileReducer";
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

  .inputfile + label:hover {
    background-color: #00b8d8;
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

  .UploadImgSection {
    border: 1px dashed black;
    padding: 20px;
  }

  @keyframes rotate {
    from {
      transform: rotate(0);

    }
    to {
      transform: rotate(360deg);

    }
  }
`

const ImgCropper = ({
                      image,
                      setResult,
                      crop,
                      imgSrc,
                      setCrop,
                      setImage,
                      result,
                      uploadImg,
                      handleFileChange,
                      onClose,
                      open,
                      classes,
                      setImgSrc
                    }) => {


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

  let dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }

  let onDropHandler = (e) => {
    e.preventDefault()
    let files = [...e.dataTransfer.files]
    setImgSrc(URL.createObjectURL(files[0]))
    setDrag(false)
  }
  let dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }
  let [drag, setDrag] = useState(false)

  return (
    <MyModal
      open={open}
      onClose={onClose}
      fullWidth={false}
      maxWidth={'sm'}
      title={'სურათის ატვირთვა'}
    >
      <Styles>
        <div className={`wrapper ${drag === true && 'UploadImgSection'}`}
             onDragStart={e => dragStartHandler(e)}
             onDragLeave={e => dragLeaveHandler(e)}
             onDragOver={e => dragStartHandler(e)}
             onDrop={e => onDropHandler(e)}

        >
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
                  <h6>ჩააგდეთ სურათი</h6>
                </div>
              </>
            }
            {result &&
              <div className={'mt-2 mb-3'}>
                <img src={result} alt="result"
                     className={classes}

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
                    <span
                      style={{cursor: 'pointer'}}
                    >აირჩიეთ</span>

              </div>
            </label>

          </div>

        </div>
        <hr/>
        <div className={'d-flex justify-content-end'}>
          {imgSrc
            && <Button
              onClick={getCroppedImg}
              style={{cursor: 'pointer'}}

            >
              მოჭრა
            </Button>
          }

          <Button className={'ml-3'}
                  onClick={uploadImg}
                  style={{cursor: 'pointer'}}
          >
            შენახვა
          </Button>
        </div>
      </Styles>

    </MyModal>
  );
};

export default ImgCropper;
