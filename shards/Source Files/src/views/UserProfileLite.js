import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails
  from "../components/user-profile-lite/UserAccountDetails";
import {GetProfileInfo} from "../Reducers/ProfileInfoReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";


const UserProfileLite = () => {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetProfileInfo())
  }, [])

  let ProfileInfo = useSelector((state => state.ProfileInfo.ProfileInfo))
  let loading = useSelector((state => state.ProfileInfo.loading))
  if (loading) {
    return <Preloader/>
  }
  return (
    <Container fluid className="main-content-container px-4 mb-5">
      <Row noGutters className="page-header py-4">
        <PageTitle title="პროფილი" md="12" className="ml-sm-auto mr-sm-auto"/>
      </Row>
      <Row>
        <Col lg="4">
          <UserDetails ProfileInfo={ProfileInfo}/>
        </Col>
        <Col lg="8">
          <UserAccountDetails ProfileInfo={ProfileInfo}/>
        </Col>
      </Row>
    </Container>
  )
};

export default UserProfileLite;
