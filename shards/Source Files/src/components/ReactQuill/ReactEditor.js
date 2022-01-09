import React from 'react';
import ReactQuill from "react-quill";
import Editor from "../add-new-post/editor/Editor";


const ReactEditor = ({...props}) => {
  Editor.modules = {

    toolbar: [

      [{header: '1'}, {header: '2'}, {header: [3, 4, 5, 6]}, {font: []}],
      [{size: []}],
      [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block'],

    ],

  }

  Editor.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
    'align'
  ]

  return (
    <ReactQuill
      modules={Editor.modules}
      formats={Editor.formats}
      {...props}
    />
  );
};

export default ReactEditor;
