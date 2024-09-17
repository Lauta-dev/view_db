import { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

const MonacoEditor = ({ value, language, theme, onChange }) => {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // TODO: Sacar ls opts a otro archio
      editorRef.current = monaco.editor.create(containerRef.current, {
        value: value || '',
        language: 'sql',
        theme: 'vs-ligth',
        minimap: { enabled: false },
        wordWrap: "on",
        suggest: { preview: true },
        automaticLayout: true
      });

      editorRef.current.onDidChangeModelContent(() => {
        if (onChange) {
          const value = editorRef.current.getValue();
          onChange(value);
        }
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, [containerRef]);

  return <div ref={containerRef} className="border-2 border-black-100 rounded" />;
};

export default MonacoEditor;

