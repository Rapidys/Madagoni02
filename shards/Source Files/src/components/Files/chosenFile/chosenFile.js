import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import styled from "styled-components";


let Styles = styled.div`
  .wrapper {
    min-height: 500px;
  }
`

const ChosenFile = () => {


  let [chosenFile, setChosenFile] = useState({})
  let params = useParams()
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`).then(response => {
      setChosenFile(response.data)
    })
  }, [])

  return (
    <Styles>
      <div className={'wrapper'}>
        <div>
          {chosenFile.id}
        </div>
        <div>
          {chosenFile.title}
        </div>
      </div>
    </Styles>

  );
};

export default ChosenFile;
