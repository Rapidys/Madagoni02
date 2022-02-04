import React, {useState} from 'react';
import {Container} from "shards-react";
import {useHistory} from "react-router-dom/cjs/react-router-dom";
import RightClickMenu from "../../RightClick/RightClickMenu";
import {uniqueIdAC} from "../../Reducers/chosenDocumentReducer";
import {useDispatch, useSelector} from "react-redux";
import {setCounter} from "../../Reducers/folderCountersReducer";
import fire from '../../assets/fire1.gif'
import Preloader from "../../Preloader/Preloader";
import {DocumentBodyStyles} from "./documentBoduStyles";
import defaultImg from '../../assets/user.png'
import {Tooltip} from "@material-ui/core";

const DocumentBody = (props) => {

  let router = useHistory()
  let loading = useSelector((state => state.GetDoc.isLoading))

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


  return (
    loading
      ? <Preloader/>
      : <DocumentBodyStyles>
        <Container fluid={true}>

          <RightClickMenu showMenu={showMenu} x={x} y={y}
                          setShowMenu={setShowMenu}/>

          <table className="table mb-0 p-5">

            <thead className="thead bg-light">
            <tr>
              <th scope="col" className="resTtd border-0">
                დოკ. <br/> ნომერი
              </th>
              <th scope="col" className="resTtd border-0">
                თარიღი
              </th>
              <th scope="col" className="resTtd border-0">
                სათაური
              </th>
              <th scope="col" className="resTtd border-0">
                ტიპი
              </th>
              <th scope="col" className="resTtd border-0">
                ავტორი
              </th>
              <th scope="col" className="resTtd border-0">
                ვადა
              </th>
            </tr>
            </thead>
            <tbody>

            {props.Documents && props.Documents.map((Mess, index) => {
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
                  <td className={"resTtd"}>{Mess.documentType}</td>
                  <td className={"resTtd"}>

                    <Tooltip
                      title={<h6 style={{color: 'white'}}>{Mess.authorName}</h6>}
                    >
                      <img src={defaultImg} alt="#" className={'rounded-circle authorImg'}
                      />
                    </Tooltip>
                  </td>

                  <td className={"resTtd"}>
                    {
                      Mess.overdue !== 0 ? <img src={fire} alt="fireAnimation"
                                                className={'fire'}
                        />
                        : 'გასვლის დრო'
                    }


                  </td>


                </tr>


              )
            })}

            </tbody>

          </table>


          {props.Documents && props.Documents.length === 0
            &&
            <h5 style={{textAlign: 'center'}} className={'mt-4'}>
              დოკუმენტები ვერ მოიძებნა... </h5>
          }
        </Container>

      </DocumentBodyStyles>

  );
};

export default DocumentBody;
