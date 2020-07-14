import ajax from "@codexteam/ajax";
import editor from "./modules/editor";
import "../scss/main.scss";

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

console.dir(contentField);

const uploadProjectImage = document.getElementById("image_url");
const uploadPublicId = document.getElementById("image_public_id");

if (uploadProjectImage) {
  uploadProjectImage.addEventListener("click", () => {
    console.log("clicky file!");
    ajax
      .transport({
        url: "http://localhost:5000/upload",
        accept: "image/*",
        progress: function (percentage) {
          document.title = `${percentage}%`;
        },
        ratio: 95,
        fieldName: "image",
      })
      .then((res) => {
        console.log(res);
        const { url, public_id } = res.body.file;
        console.log(url, public_id);
        uploadProjectImage.value = url;
        uploadPublicId.value = public_id;
        console.dir(uploadPublicId);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
