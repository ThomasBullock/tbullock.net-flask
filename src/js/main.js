import editor from "./modules/editor";
import "../scss/main.scss";

const saveButton = document.querySelector("#save");
const contentField = document.querySelector("#content");

console.log(saveButton, contentField);

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

console.dir(contentField);
