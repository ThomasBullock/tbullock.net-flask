import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import ImageTool from "@editorjs/image";
import CodeTool from "@editorjs/code";
import { fileFormating } from "../constants";

const editor = new EditorJS({
  /**
   * Id of Element that should contain Editor instance
   */
  holder: "editorjs",
  tools: {
    code: CodeTool,
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
        const codeBlocks = outputData.blocks.filter(
          (block) => block.type === "code"
        );

        const isJavascript = fileFormating["js"].regex.test(
          codeBlocks[0].data.code
        );
        const isCSS = fileFormating["css"].regex.test(codeBlocks[0].data.code);
        const isHTML = fileFormating["html"].regex.test(
          codeBlocks[0].data.code
        );

        console.log(isJavascript, isCSS, isHTML);
        if (isJavascript) {
          outputData.blocks[9].data.language = "js";
        }
        if (isCSS) {
          outputData.blocks[9].data.language = "css";
        }
        if (isHTML) {
          outputData.blocks[9].data.language = "html";
        }
        // outputData.blocks[9].data.code = formatted;
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

  const formatCode = (data) => {
    const isJavascript = fileFormating["js"].regex.test(data);

    if (isJavascript) {
      const formattings = fileFormating["js"].formattings;
      formattings.forEach((process) => {
        data = data.replace(process.regex, process.replacement);
      });
    }
    console.log(data);
    console.log(isJavascript);
    return data;
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
