const adminProjectSelect = document.getElementById("admin-project-select");
if (adminProjectSelect) {
  const adminProjectEdit = document.getElementById("admin-project-edit");
  adminProjectSelect.addEventListener("change", (e) => {
    console.log(e, adminProjectSelect.value);
    adminProjectEdit.setAttribute(
      "href",
      "/projects/" + adminProjectSelect.value + "/update"
    );
  });
}

const Project = Vue.component("Project", {
  // ... options ...
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  template: `<div>
              <h2>{{data.title}}</h2>
              <img class="img-responsive" :src="data.image_url" :alt="data.title + ' screenshot'"/>
              <p>{{data.comments}}</p>
            </div>`,
});

const vm = new Vue({
  // Again, vm is our Vue instance's name for consistency.
  el: "#vm",
  delimiters: ["[[", "]]"],
  data: {
    greeting: "Hello, Vue!",
    projects: JSON.parse(x),
    currentProject: 0,
  },
  components: {
    project: Project,
  },
  methods: {
    changeProject(direction) {
      console.log(direction);
      // const op = operators[direction];
      if (this.currentProject < this.projects.length && direction === "+") {
        this.currentProject++;
      } else if (this.currentProject > 0 && direction === "-") {
        this.currentProject--;
      }
    },
  },
  created: function () {
    // `this` points to the vm instance
    console.log("a is: " + this.project);
    // console.log(JSON.parse(this.dinger));
  },
  template: `<div><project :data="projects[currentProject]"></project>
  <footer class="projects__footer">
    <button :disabled="currentProject === 0" class="btn btn-primary btn-icon-left icon-arrow-left" @click="changeProject('-')">Previous</button>
    <button :disabled="currentProject === projects.length - 1" class="btn btn-primary btn-icon-right icon-arrow-right" @click="changeProject('+')">next</button></footer>
  </div>`,
});

console.log(x);
