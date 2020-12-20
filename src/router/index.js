const { createRouter, createWebHistory } = require("vue-router");
import Home from "@/views/Home.vue";
import Project from "@/views/Project.vue";
import Register from "@/views/Register.vue";
import NotFound from "@/views/NotFound.vue";
import AddNewProject from "@/views/AddNewProject.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/project/:project_number",
    name: "Project",
    component: Project,
  },
  {
    path: "/project/:project_number/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/add_project",
    name: "Add New Project",
    component: AddNewProject,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
