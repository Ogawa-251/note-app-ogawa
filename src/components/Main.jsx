import React from "react";
import "./Main.css";
import ReactMarkdown from 'react-markdown';


const Main = ({ actineNote, onUpdateNote }) => {
  const onEditNote = (key, value) => {
    onUpdateNote({
      ...actineNote,
      [key]: value,
      modDate: Date.now(),
    });
  };

  if(!actineNote) {
    return <div className="no-active-note">ノートが選択されていません</div>;
  }


    return (
      <div className="app-main">
        <div className="app-main-note-edit">
          <input 
            id="title"
            type="text"
            value={actineNote.title} 
            onChange={(e) => onEditNote("title", e.target.value)} 
           />
          <textarea id="content"  
          placeholder="ノート内容を記入"
          value={actineNote.content}
          onChange={(e) => onEditNote("content", e.target.value)}
          ></textarea>
        </div>
        <div className="app-main-note-preview">
          <h1 className="preview-title">{actineNote.title}</h1>
          <ReactMarkdown className="markdown-preview">{actineNote.content}
          </ReactMarkdown>

        </div>
      </div>
    );
  };
  
  export default Main;
  