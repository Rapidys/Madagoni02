import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCounter} from "../../../../../Reducers/folderCountersReducer";
import styled from "styled-components";
import {Tooltip} from "@material-ui/core";

let Styles = styled.div`

  .Counter {
    min-width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #00a2bf;
    text-align: center;
    margin-left: 5px;
    color: white;
    font-size: 10px;
    position: fixed;
    cursor: pointer;
  }

  .forNewSign {
    left: 35px;
    top: 120px;
  }

  .forNewReceived {
    left: 35px;
    top: 170px;
  }

  .forSign {
    left: 10px;
    top: 120px;
  }

  .forReceived {
    left: 10px;
    top: 170px;
  }

  @media (max-width: 576px) {
    .forNewSign {
      left: 33px;
      top: 110px;
    }

    .forNewReceived {
      left: 33px;
      top: 158px;
    }

    .forSign {
      left: 8px;
      top: 110px;
    }

    .forReceived {
      left: 8px;
      top: 158px;
    }
  }


`


const Counter = () => {
  let dispatch = useDispatch()
  let Counter = useSelector((state => state.folderCounter.folderCount))

  useEffect(() => {
    dispatch(setCounter())
    const interval = setInterval(() => {
      dispatch(setCounter())
    }, 5000);

    return () => clearInterval(interval);
  }, [])


  return (
    <Styles>


      <Tooltip title="ახალი ხელმოსაწერი" arrow>

        <div
          className={Counter && Counter.forSignNew === 0 ? 'd-none' : 'Counter forNewReceived bg-danger'}>
          <span>{Counter && Counter.forSignNew}</span>
        </div>

      </Tooltip>

      <Tooltip title={'ახალი მოსული'} arrow>
        <div
          className={Counter && Counter.receivedNew === 0 ? 'd-none' : 'Counter forNewSign bg-danger'}>
          <span>{Counter && Counter.receivedNew}</span>
        </div>
      </Tooltip>
      <Tooltip title={'მიღებული დოკ.რაოდენობა'} arrow>
        <div className={'Counter forSign '}>
          <span
            className={'counterAlign'}
          >{Counter && Counter.received}</span>
        </div>
      </Tooltip>

      <Tooltip title={'მიღებული დოკ.რაოდენობა'} arrow>
        <div className={'Counter forReceived '}
        >
          <span
            className={'counterAlign'}
          >{Counter && Counter.forSign}</span>
        </div>

      </Tooltip>


    </Styles>
  );
};

export default Counter;
