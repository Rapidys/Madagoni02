import React from 'react';
import ReactQuill from "react-quill";
import Editor from "../add-new-post/editor/Editor";
import styled from 'styled-components'

let Styles = styled.div`
  .ql-snow .ql-tooltip {
    margin-left: 140px;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "ლინკი:"
  }

  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "ლინკი:"
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    content: 'შენახვა';
  }
`
const ReactEditor = ({...props}) => {
  // let icons = Quill.import('ui/icons');
  // icons['video'] = '<i class="fas fa-chart-bar text-secondary" />';
  // let Block = Quill.import('blots/block');
  // Block.tagName = 'DIV';
  // Quill.register(Block, true);

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
    <Styles>
      <ReactQuill
        modules={Editor.modules}
        formats={Editor.formats}
        className={'wrapper'}
        {...props}
      />
    </Styles>

  );
};

export default ReactEditor;
