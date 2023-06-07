import React from 'react'

const CodeEditor = ({ lesson }) => {
  return (
        <iframe
          src={lesson.notebookURL}
          height="800"
          width="800"
          frameBorder="0"
          scrolling="auto"
          title="notebookf968a7b813"
        ></iframe>
  )
}

export default CodeEditor