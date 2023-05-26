import React from "react";
import "../styles/PersonalDetails.css";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

export default function PersonalDetails({ setPage }) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [show, setShow] = React.useState(false);
  function selectPage(event) {
    setPage(event.target.innerText);
  }

  return (
    <React.Fragment>
      <div className="PersonalDetailsContainer">
        <div>
          <ul>
            <li>Name</li>
            <li>Level</li>
            <li>Rank</li>
            <li>Age</li>
            <li>Gang</li>
            <li>Partner</li>
            <li>Award</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Rockwood</li>
            <li>100</li>
            <li>#19 Celebrity Felon</li>
            <li>1234</li>
            <li>Gang of Wasypur</li>
            <li>Want3d</li>
            <li>200</li>
          </ul>
        </div>
      </div>
      <div className="profileSignature">
        <Editor editorState={editorState} onChange={setEditorState} />;
      </div>
    </React.Fragment>
  );
}
