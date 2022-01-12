import React, {useEffect, useState} from 'react';
import {CardBody} from "shards-react";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import RightClickMenu from "../../RightClick/RightClickMenu";
import {uniqueIdAC} from "../../Reducers/chosenDocumentReducer";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {setCounter} from "../../Reducers/folderCountersReducer";
import fire from '../../assets/fire1.gif'
import Preloader from "../../Preloader/Preloader";

let Styles = styled.div`

  .resTtd {
    padding: 1rem;
  }

  .fire {
    width: 40px;
    height: 40px;
  }

  @media screen and (max-width: 921px) {
    .resTtd {
      font-size: 12px;
      padding: 0.75rem;
    }

    .fire {
      width: 30px;
      height: 30px;
    }
  }
  @media screen and (max-width: 840px) {
    .resTtd {
      font-size: 14px;
      padding: 0.35rem;
    }

    .fire {
      width: 30px;
      height: 30px;
    }
  }

  @media screen and (max-width: 540px) {
    .resTtd {
      font-size: 14px;
    }

    thead {
      font-size: 12px;
      padding: 0;
      margin: 0;
    }

    table {
      padding: 0;
    }

    .fire {
      width: 20px;
      height: 20px;
    }

    .resTtd {
      font-size: 9px;
    }

  }


  @media screen and (max-width: 420px) {
    .resTtd {
      font-size: 8px;
      padding: 0.25rem;
    }
  }
  @media screen and (max-width: 400px) {
    .resTtd {
      font-size: 7px;
      padding: 0.15rem;
    }
  }
  @media screen and (max-width: 340px) {
    .resTtd {
      font-size: 5px;
    }
  }
  @media screen and (max-width: 310px) {
    .resTtd {
      font-size: 4px;
    }
  }

`


const DocumentBody = (props) => {

  let router = useHistory()
  let isLoading = useSelector(state => state.filterR.filterLoading)
  let loading = useSelector(state => state.GetDoc.isLoading)

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [showMenu, setShowMenu] = useState(false)


  let dispatch = useDispatch()

  let contextMenu = (e, id) => {
    e.preventDefault()
    setX(e.pageX - 250)
    setY(e.pageY - 60)

    setShowMenu(true)
    dispatch(uniqueIdAC(id))
  }



  if (props.Documents.length === 0) {
    return <h4 style={{textAlign: 'center'}} className={'mt-4'}>დოკუმენტები ვერ
      მოიძებნა...</h4>
  }


  return (
    loading
      ? <Preloader/>
      : <Styles>
        <CardBody className="p-4 pb-3">
          <RightClickMenu showMenu={showMenu} x={x} y={y} setShowMenu = {setShowMenu}/>

          <table className="table mb-0 p-5">
            <thead className="thead bg-light">
            <tr>
              <th scope="col" className="resTtd border-0">
                დოკ. <br/> ნომერი
              </th>
              <th scope="col" className="resTtd border-0">
                დოკუმენტის თარიღი
              </th>
              <th scope="col" className="resTtd border-0">
                დოკუმენტის თემა
              </th>
              <th scope="col" className="resTtd border-0">
                ავტორი
              </th>
              <th scope="col" className="resTtd border-0">
              </th>
            </tr>
            </thead>
            <tbody>

            {props.Documents.map((Mess, index) => {
              return (
                <tr
                  className={Mess.isNew === true ? 'font-weight-bold  messWrapper' : 'messWrapper'}
                  onClick={() => {
                    router.push(`${props.pageName}/${Mess.documentId}`)
                    setShowMenu(false)
                    dispatch(setCounter())
                  }}
                  key={index}
                  onContextMenu={(e) => contextMenu(e, Mess.documentId)}
                  id={Mess.documentId}
                  style={{
                    backgroundColor: Mess.documentColorId === 1 && '#ffcccc' ||
                      Mess.documentColorId === 2 && '#fff2cc' || Mess.documentColorId === 3 && '#ccffcc'
                  }}
                >
                  <td className={"resTtd"}>{Mess.documentId}</td>
                  <td className={"resTtd"}>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "numeric",
                      day: "2-digit",
                      year: "numeric",

                    }).format(new Date(Mess.documentDate))}
                  </td>
                  <td className={"resTtd"}>{Mess.documentTitle}</td>
                  <td className={"resTtd"}>{Mess.documentType} </td>
                  <td className={"resTtd"}>
                    {
                      Mess.overdue !== 0 && <img src={fire} alt="fireAnimation"
                                                 className={'fire'}
                      />
                    }
                  </td>

                </tr>


              )
            })}

            </tbody>

          </table>

        </CardBody>
      </Styles>

  );
};

export default DocumentBody;
