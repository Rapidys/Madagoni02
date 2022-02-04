import React, {Component, createRef, useState} from "react";
import ReactDOM from "react-dom";
import ColumnResizer from "column-resizer";
import styled from "styled-components";
import '../MySpreadSheet/spreadSheet.css'
import {FormTextarea} from "shards-react";
import RightClickAddUser from "../rightClickAddUsers/rightClickAddUser";
import AddUserMenu from "../rightClickAddUsers/AddUserMenu";
import {connect} from "react-redux";
import {
  setAsideIndexAC,
  setInsideIndexAC, SetisCallRowAC, setRowColsClickedAC
} from "../../../Reducers/files/newFileReducer";
import {Tooltip} from "@material-ui/core";
import DeleteUsersFromArray from "../newFile/deleteUsersFromArray";

let Styles = styled.div`
  .table > :not(caption) > * > * {
    padding: 0;
  }

  td {
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  th:first-child {
    width: 40px;
    text-align: center;
  }

  tr:first-child td {
    border-top: 1px solid #ccc;
  }

  td:last-child {
    border-right: 1px solid #ccc;
  }
`

class ReactTable extends Component {
  constructor(props) {
    super(props);
    this.tableSelector = "#somethingUnique";
    this.state = {
      draggableValue: '',
      showMenu: false,
      x: 0,
      y: 0,
      openUsersTree: false,
      openUsersController: false,
    }
  }


  componentDidMount() {
    if (this.props.resizable) {
      this.enableResize();
    }
    window.addEventListener('click', () => {
      this.setState({showFullText: false})
    });
    window.addEventListener('click', (e) => {
      return this.setState({showMenu: false})
    })
  }

  componentWillUnmount() {
    if (this.props.resizable) {
      this.disableResize();
    }
    window.removeEventListener('contextmenu', this.handleContext)
  }

  componentDidUpdate() {
    if (this.props.resizable) {
      this.enableResize();
    }

  }

  componentWillUpdate() {
    if (this.props.resizable) {
      this.disableResize();
    }
  }

  enableResize() {
    const options = this.props.resizerOptions;
    if (!this.resizer) {
      this.resizer = new ColumnResizer(
        ReactDOM.findDOMNode(this).querySelector(`${this.tableSelector}`),
        options
      );
    } else {
      this.resizer.reset(options);
    }
  }

  disableResize() {
    if (this.resizer) {
      this.resizer.reset({disable: true});
    }
  }


  handleContext = (e, inpIndex, index) => {
    e.preventDefault()
    this.setState({
      x: `${e.pageX - 220}px`,
      y: `${e.pageY - 60}px`,
      showMenu: true,
    });
    this.props.setAsideIndex(index)
    this.props.insideIndex(inpIndex)
    this.props.SetIsCallRow(false)
  }
  handleContextRow = (e, index) => {
    e.preventDefault()
    this.setState({
      x: `${e.pageX - 220}px`,
      y: `${e.pageY - 60}px`,
      showMenu: true,
    });
    this.props.setAsideIndex(index)
    this.props.RowClicked(true)
    this.props.SetIsCallRow(true)
  }
  handleContextCol = (e, index) => {
    e.preventDefault()
    this.setState({
      x: `${e.pageX - 220}px`,
      y: `${e.pageY - 60}px`,
      showMenu: true,
    });
    this.props.setAsideIndex(index)
    this.props.RowClicked(false)
    this.props.SetIsCallRow(true)
  }

  onUserTreeClose = () => {
    this.setState({openUsersTree: false})
  }
  onUserTreeOpen = (e) => {
    if (this.props.url === '/newFile') {
      this.setState({openUsersTree: true})
    } else {
      if (Number(this.props.decodedToken.UserId) === this.props.fileInfo.authorId) {
        this.setState({openUsersTree: true})
      }
    }
  }
  onOpenUsersController = () => {
    if (this.props.url === '/newFile') {
      this.setState({openUsersController: true})
    } else {
      if (Number(this.props.decodedToken.UserId) === this.props.fileInfo.authorId) {
        this.setState({openUsersController: true})
      }
    }
  }
  onCloseUsersController = () => {
    this.setState({openUsersController: false})
  }
  handleUsersFromArray = (it) => {
    let test = 0
    it.users.map(item => {
      if (item.userId !== Number(this.props.decodedToken.UserId)) {
        return test = 1
      }
      if (item.userId === Number(this.props.decodedToken.UserId)) {
        return test = 0
      }
    })
    if (test === 1) {
      return true
    }
  }

  render() {

    return (
      <Styles>
        <div
          style={{overflow: 'scroll', height: '400px'}}

        >
          <RightClickAddUser x={this.state.x} y={this.state.y}
                             showMenu={this.state.showMenu}
                             onOpenTree={this.onUserTreeOpen}
                             onOpenUsersController={this.onOpenUsersController}
          />

          <AddUserMenu
            openTree={this.state.openUsersTree}
            onTreeClose={this.onUserTreeClose}
            ColRows={this.props.ColRows}
            setData={this.props.setData}
          />

          <DeleteUsersFromArray
            onClose={this.onCloseUsersController}
            open={this.state.openUsersController}
            ColRows={this.props.ColRows}
            setData={this.props.setData}
          />

          <table id={'somethingUnique'}
                 className={'w-50'}
          >
            <thead>
            <tr
            >
              <th/>
              {this.props.ColRows[0].map((item, index) => {
                return <th scope="col"
                           style={{textAlign: 'center', width: '100px'}}
                           className={'table-border'}
                           key={index}
                           onContextMenu={(e) => this.handleContextCol(e, index)}
                >
                  {this.props.alphabet[index]}
                </th>
              })}
            </tr>

            </thead>
            <tbody>

            {
              this.props.ColRows.map((item, index) => (
                <tr key={index}
                >
                  <th scope={'row'}
                      onContextMenu={(e) => this.handleContextRow(e, index)}
                  >
                    <div className={'mt-1'}>
                      {index + 1}
                    </div>
                  </th>
                  {item.map((it, inpIndex) => {
                      return (
                        <td className={'p-0 m-0'}
                            key={inpIndex}
                            onContextMenu={(e) => this.handleContext(e, inpIndex, index)}
                        >
                          <Tooltip
                            title={<div style={{
                              color: 'white',
                              fontSize: '16px',
                              padding: '5px',
                            }}>{it.users && it.users.map(item => item.displayName)}</div>}
                          >
                            {
                              this.props.url === '/newFile'
                                ? <FormTextarea
                                  value={it.value}
                                  onChange={(e) =>
                                    this.props.handleChange(e, inpIndex, index)}
                                  className={'p-1 border-0'}
                                  onClick={this.props.changeCursor}
                                  id={inpIndex}
                                  style={{
                                    cursor: this.props.cursor,
                                    background: 'transparent',
                                    overflow: 'hidden',
                                    height: '30px',
                                    resize: 'none',
                                    borderRadius: '7px'
                                  }}
                                  onFocus={this.props.changeCursor}

                                />

                                : <FormTextarea
                                  value={it.value}
                                  onChange={(e) =>
                                    this.props.handleChange(e, inpIndex, index)}
                                  className={'p-1 border-0'}
                                  onClick={this.props.changeCursor}
                                  id={inpIndex}
                                  style={{
                                    cursor: this.props.cursor,
                                    background: 'transparent',
                                    overflow: 'hidden',
                                    height: '30px',
                                    resize: 'none',
                                    borderRadius: '7px'
                                  }}
                                  readOnly={this.handleUsersFromArray(it)}
                                  onFocus={this.props.changeCursor}

                                />

                            }

                          </Tooltip>


                        </td>
                      )
                    }
                  )}
                </tr>


              ))
            }


            </tbody>
          </table>

        </div>
      </Styles>

    )
      ;
  }
}

let mapStateToProps = () => ({})
let mapDispatchToProps = (dispatch) => {
  return {
    setAsideIndex: (payload) => {
      dispatch(setAsideIndexAC(payload))
    },
    insideIndex: (payload) => {
      dispatch(setInsideIndexAC(payload))
    },
    RowClicked: (payload) => {
      dispatch(setRowColsClickedAC(payload))
    },
    SetIsCallRow: (payload) => {
      dispatch(SetisCallRowAC(payload))
    }
  }
}
let ReactTableContainer = connect(mapStateToProps, mapDispatchToProps)(ReactTable)
export default ReactTableContainer;
