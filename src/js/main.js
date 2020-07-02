import editor from "./modules/editor";
import "../scss/main.scss";

console.log(editor);

const saveButton = document.querySelector("#save");
const contentField = document.querySelector("#content");

console.log(saveButton, contentField);

saveButton.addEventListener("click", () => {
  console.log("clicks");
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
