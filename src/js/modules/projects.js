import Vue from "vue";

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
  runtimeCompiler: true,
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
  runtimeCompiler: true,
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
  computed: {
    isFirst() {
      return this.currentProject === 0;
    },
    isLast() {
      return this.currentProject === this.projects.length - 1;
    },
  },
  created: function () {
    // `this` points to the vm instance
    console.log("a is: " + this.project);
    // console.log(JSON.parse(this.dinger));
  },
  template: `<div><project :data="projects[currentProject]"></project>
  <footer class="projects__footer">
    <button class="btn btn-primary" :class="{'disabled': isFirst, 'btn-icon-left icon-arrow-left' : !isFirst}" @click="changeProject('-')">Previous</button>
    <button class="btn btn-primary" :class="{'disabled': isLast, 'btn-icon-right icon-arrow-right' : !isLast}" @click="changeProject('+')">next</button></footer>
  </div>`,
});

console.log(x);
