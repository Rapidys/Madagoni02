import React, {useState} from 'react';
import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  FormInput
} from "shards-react";
import styled from "styled-components";
import * as yup from "yup";
import {Formik} from "formik";

let Styles = styled.div`
  .controlWrapper {
    max-width: 600px;
    margin: 60px auto;
    padding: 20px;
    box-sizing: border-box;

  }
`

const ChartControl = () => {
  const validationSchema = yup.object().shape({
    tbilisi: yup.number().typeError('უნდა იყოს ციფრი'),
    rustavi: yup.number().typeError('უნდა იყოს ციფრი'),
    batumi: yup.number().typeError('უნდა იყოს ციფრი'),
    zugdidi: yup.number().typeError('უნდა იყოს ციფრი'),
    guria: yup.number().typeError('უნდა იყოს ციფრი'),
    mcxeta: yup.number().typeError('უნდა იყოს ციფრი'),
  })

  return (
    <Styles>
      <Container className={'controlWrapper'}>
        <Card className={"p-5"}>
          <Formik
            initialValues={{
              tbilisi: '',
              rustavi: '',
              batumi: '',
              zugdidi: '',
              guria: '',
              mcxeta: '',

            }}
            onSubmit={(values) => console.log(values)}
            validateOnBlur
            validationSchema={validationSchema}
          >
            {({
                values, errors, isValid,
                handleSubmit, handleBlur, handleChange,
                touched, dirty
              }) => {
              return <Form>
                <FormGroup>
                  <FormInput
                    type='number'
                    placeholder='თბილისი'
                    name='tbilisi'
                    value={values.tbilisi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={1}
                    max={100}
                  />
                  {touched.tbilisi && errors.tbilisi &&
                  <p
                    style={{color: 'red'}}
                  >{errors.tbilisi}</p>}
                </FormGroup>
                <FormGroup>
                  <FormInput
                    type='number'
                    placeholder='რუსთავი'
                    name='rustavi'
                    value={values.Rustavi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={1}
                    max={100}
                  />
                  {touched.rustavi && errors.rustavi &&
                  <p
                    style={{color: 'red'}}
                  >{errors.rustavi}</p>}
                </FormGroup>
                <FormGroup>
                  <FormInput
                    type='number'
                    placeholder='ბათუმი'
                    name='batumi'
                    value={values.Batumi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={1}
                    max={100}
                  />
                  {touched.batumi && errors.batumi &&
                  <p
                    style={{color: 'red'}}
                  >{errors.batumi}</p>}
                </FormGroup>
                <FormGroup>
                  <FormInput
                    type='number'
                    placeholder='ზუგდიდი'
                    name='zugdidi'
                    value={values.Zugdidi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={1}
                    max={100}
                  />
                  {touched.zugdidi && errors.zugdidi &&
                  <p
                    style={{color: 'red'}}
                  >{errors.zugdidi}</p>}
                </FormGroup>
                <FormGroup>
                  <FormInput
                    type='number'
                    placeholder='გურია'
                    name='guria'
                    value={values.Guria}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={1}
                    max={100}
                  />
                  {touched.guria && errors.guria &&
                  <p
                    style={{color: 'red'}}
                  >{errors.guria}</p>}
                </FormGroup>
                <FormGroup>
                  <FormInput
                    type='number'
                    placeholder='მცხეთა'
                    name='mcxeta'
                    value={values.Mcxeta}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={1}
                    max={100}
                  />
                  {touched.mcxeta && errors.mcxeta &&
                  <p
                    style={{color: 'red'}}
                  >{errors.mcxeta}</p>}
                </FormGroup>

                <Button
                  theme={'success'}
                  onClick={handleSubmit}
                  type={'submit'}
                  disabled={!isValid || !dirty}

                >შენახვა</Button>
              </Form>
            }}
          </Formik>

        </Card>
      </Container>
    </Styles>

  );
};

export default ChartControl;
