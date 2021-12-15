// import styled from 'styled-components'
// import {useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import Tree from "./RTree";
// import Preloader from "../../../Preloader/Preloader";
// import {TreeData} from "../../../Reducers/TreeDataReducer";
//
// let Styles = styled.div`
//
//   .d-tree-container {
//     list-style: none;
//     padding: 0;
//   }
//
//   .d-tree-node {
//     padding: 0.35rem 0.65rem;
//   }
//
//   .d-tree-node {
//     margin: 0 0.85rem;
//   }
//
//   .d-tree-toggler.active {
//     transform: rotate(45deg);
//     transition: 0.5s;
//   }
//
//
// `
//
// const TreeList = (props) => {
//
//   let dispatch = useDispatch()
//   let treeData = useSelector((state => state.Tree.Structure))
//
//   useEffect(async () => {
//     return await dispatch(TreeData())
//   }, [])
//
//   if (props.treeData.length === 0) {
//     return <Preloader/>
//   }
//   return (
//     <Styles>
//
//       <div className="row">
//         <div className="col ">
//           <div className="mt-3">
//             <div className="row mt-3 d-flex  ml-1">
//               <div className="text-left text-dark">
//                 <Tree data={treeData}
//                       addUser = {props.addUser}
//                       newUser = {props.newUser}
//
//                 />
//
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Styles>
//
//   );
// };
//
//
// export default TreeList;
