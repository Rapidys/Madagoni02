import React, {useState} from "react";
import {
  Card,
  CardHeader,
  Button,
  FormGroup
} from "shards-react";
import {useDispatch, useSelector} from "react-redux";
import 'react-image-crop/dist/ReactCrop.css';
import userDefault from '../../assets/user.png'
import API from "../../API/ApiBases";
import {GetProfileInfo} from "../../Reducers/ProfileInfoReducer";
import ImgCropper from "../ImgCropper/ImgCropper";


const UserDetails = ({ProfileInfo}) => {

  let user = useSelector(state => state.Auth.currentUser)
  let [imgSrc, setImgSrc] = useState(null)
  let [open, setOpen] = useState(false)
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const [crop, setCrop] = useState({aspect: 0});

  let dispatch = useDispatch()
  let onClose = () => {
    setOpen(v => !v)
  }

  let handleFileChange = (e) => {
    setImgSrc(URL.createObjectURL(e.target.files[0]))
  }


  let [isImg, setIsImg] = useState(false)

  let uploadImg = () => {
    API.setProfileImage({stringPhoto: result}).then(response => {
      setIsImg(true)
      setOpen(false)
      dispatch(GetProfileInfo())
    })
  }


  return (
    <Card small className="mb-4 pt-3">
      <CardHeader className="border-bottom text-center">
        <div className="mb-3 mx-auto">
          <img
            className="rounded-circle"
            src={ProfileInfo.stringPhoto ? ProfileInfo.stringPhoto : userDefault}
            alt={user.name}
            style={{width: '130px', height: '130px'}}
          />
        </div>
        <h4
          className="mb-0">{`${ProfileInfo.firstName} ${ProfileInfo.lastName}`}</h4>
        <span className="text-muted d-block mb-2">{ProfileInfo.position}</span>
        <Button
          onClick={onClose}
          style={{cursor: 'pointer'}}

        >
          ფოტოს ატვირთვა
        </Button>

        <ImgCropper
          image={image}
          setResult={setResult}
          crop={crop}
          imgSrc={imgSrc}
          setCrop={setCrop}
          setImage={setImage}
          result={result}
          uploadImg={uploadImg}
          handleFileChange={handleFileChange}
          onClose={onClose}
          open={open}
          classes={'rounded-circle'}
          setImgSrc={setImgSrc}

        />

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
