import ajax from "@codexteam/ajax";
// import editor from "./modules/editor";
import "../scss/main.scss";

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
