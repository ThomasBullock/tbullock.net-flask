import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import ImageTool from "@editorjs/image";

const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: "editorjs",
  tools: {
    header: {
      class: Header,
      inlineToolbar: ["link"],
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    inlineCode: {
      class: InlineCode,
      shortcut: "CMD+SHIFT+M",
      inlineToolbar: true,
    },
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: "http://localhost:5000/upload", // Your backend file uploader endpoint
          byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
        },
      },
    },
  },
  onReady: () => {
    console.log("Editor.js is ready to work!");
  },
});

export default editor;
