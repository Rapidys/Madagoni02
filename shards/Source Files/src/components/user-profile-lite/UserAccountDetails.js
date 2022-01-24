import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormTextarea,
  Button
} from "shards-react";
import ImgCropper from "../ImgCropper/ImgCropper";
import {useDispatch, useSelector} from "react-redux";
import {
  onSignatureValueChangeAC,
  setNewSignature
} from "../../Reducers/ProfileInfoReducer";
import defaultImg from '../../assets/signature.jpg'
import styled from 'styled-components'

let Styles = styled.div`
  .signatureWrapper {
    align-items: center;
    border: 1px solid #e1e5eb;
    border-radius: 0.25rem;
    font-weight: 300;
    will-change: border-color, box-shadow;
    transition: box-shadow 250ms cubic-bezier(.27, .01, .38, 1.06), border 250ms cubic-bezier(.27, .01, .38, 1.06);
    margin: 0;
  }

  .setImg {
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center;
    resize: none;
  }

  #col-withoud-padding {
    padding-right: 0;
    padding-left: 0;
  }
`


const UserAccountDetails = ({ProfileInfo}) => {
    let [imgSrc, setImgSrc] = useState(null)
    let [open, setOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [result, setResult] = useState(null)
    const [crop, setCrop] = useState({aspect: 0});
    let dispatch = useDispatch()


    let signatureDefaultValue = useSelector((state => state.ProfileInfo.signatureDefaultValue))

    let onClose = () => {
      setOpen(v => !v)
      setResult(null)
    }

    let handleFileChange = (e) => {
      setImgSrc(URL.createObjectURL(e.target.files[0]))
    }


    let uploadImg = () => {
      setOpen(false)
    }
    let openImgCropper = () => {
      setOpen(true)
    }


    let onSignatureChange = (e) => {
      dispatch(onSignatureValueChangeAC(e.target.value))

    }
    let test = () => {
      dispatch(setNewSignature({
        signatureImg: result,
        signatureText: signatureDefaultValue
      }))
    }
    return (
      <Styles>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">დეტალები</h6>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className="p-3">
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
                classes={''}
                setImgSrc={setImgSrc}

              />
              <Row>
                <Col>
                  <Form>
                    <Row form>
                      {/* First Name */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feFirstName">სახელი</label>
                        <FormInput
                          id="feFirstName"
                          placeholder="First Name"
                          value={ProfileInfo.firstName || ''}
                          readOnly={true}

                        />
                      </Col>
                      {/* Last Name */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feLastName">გვარი</label>
                        <FormInput
                          id="feLastName"
                          placeholder="Last Name"
                          value={ProfileInfo.lastName || ''}
                          readOnly={true}


                        />
                      </Col>
                    </Row>
                    <Row form>
                      {/* Email */}
                      <Col md="6" className="form-group">
                        <label htmlFor="feEmail">ე-მაილი</label>
                        <FormInput
                          type="email"
                          id="feEmail"
                          placeholder="Email Address"
                          value={ProfileInfo.email || ''}
                          autoComplete="email"
                          readOnly={true}


                        />
                      </Col>
                      {/* Password */}
                      <Col md="6" className="form-group">
                        <label htmlFor="fePassword">მობილური</label>
                        <FormInput
                          type="text"
                          id="fePassword"
                          placeholder="მობილური"
                          value={ProfileInfo.phone || ''}
                          autoComplete="current-password"
                          readOnly={true}

                        />
                      </Col>
                    </Row>


                    <Row form className={'signatureWrapper'}>
                      <Col md="8" id={'col-withoud-padding'}>
                        <FormTextarea
                          style={{
                            height: '150px', resize: 'none', border: 'none'

                          }}
                          placeholder='ხელმოწერილი ტექსტი'
                          value={signatureDefaultValue}
                          onChange={(e) => onSignatureChange(e)}
                        />

                      </Col>
                      <Col md="4" id={'col-withoud-padding'}>
                        <FormTextarea
                          style={{
                            height: '150px',
                            backgroundColor: 'white',
                            backgroundImage: `url(${result ? result : defaultImg})`,
                            backgroundSize: 'contain',
                            border: 'none',
                          }}
                          readOnly={true}
                          className={'setImg'}
                        />
                      </Col>

                    </Row>
                    <Row className={'justify-content-end'}>
                      <Col md="4" className="form-group">
                        <Button
                          style={{cursor: 'pointer'}}
                          className={'w-100 mt-2'}
                          onClick={openImgCropper}
                        >
                          ხელმოწერის არჩევა
                        </Button>

                      </Col>
                    </Row>
                    <Button theme="accent" className={'mt-2'}
                            onClick={test}
                    >შენახვა</Button>
                    <br/>


                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Styles>

    )
  }
;

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails;
