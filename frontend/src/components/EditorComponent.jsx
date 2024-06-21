import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
  ],
};

const EditorComponent = () => {
  const ejInstance = useRef(null);
  const editorContainerRef = useRef(null);

  const initEditor = () => {
    if (!editorContainerRef.current) return;

    const editor = new EditorJS({
      holder: editorContainerRef.current,
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      onChange: async () => {
        const content = await editor.saver.save();
        console.log(content);
      },
      tools: {
        header: Header,
      },
    });
  };

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  return <div ref={editorContainerRef} className="w-full h-full" id="editorjs"></div>;
};

export default EditorComponent;
