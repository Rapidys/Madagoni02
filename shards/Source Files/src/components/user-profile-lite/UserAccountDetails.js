import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import jwtDecode from "jwt-decode";
import {GetProfileInfo} from "../../Reducers/ProfileInfoReducer";
import {useDispatch, useSelector} from "react-redux";

const UserAccountDetails = ({ProfileInfo}) => {


    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">დეტალები</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
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
                      <label htmlFor="fePassword">პაროლი</label>
                      <FormInput
                        type="password"
                        id="fePassword"
                        placeholder="Password"
                        value="EX@MPL#P@$$w0RD"
                        autoComplete="current-password"
                        readOnly={true}

                      />
                    </Col>
                  </Row>


                  <Row form>
                    {/* Description */}

                  </Row>
                  <Button theme="accent">განახლება</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
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
