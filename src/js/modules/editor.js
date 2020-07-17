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

// export default editor;

const saveButton = document.querySelector("#save");
const contentField = document.querySelector("#content");

console.log(saveButton, contentField);

if (saveButton) {
  saveButton.addEventListener("click", () => {
    editor
      .save()
      .then((outputData) => {
        console.log("Article data: ", outputData);
        contentField.value = JSON.stringify(outputData);
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  });

  const init = () => {
    console.dir(editor);
    const article = JSON.parse(contentField.value);
    console.log(article.blocks);
    editor.render({ blocks: article.blocks });
  };

  editor.isReady
    .then(() => {
      console.log("Editor.js is ready to work!");
      if (contentField.value.length) {
        console.log("have content");
        init();
      }
      /** Do anything you need after editor initialization */
    })
    .catch((reason) => {
      console.log(`Editor.js initialization failed because of ${reason}`);
    });
}
