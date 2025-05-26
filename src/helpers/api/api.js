const backendDomain = "https://focus-backend-q1ve.onrender.com";

export const apiArray = {
  // ==== AUTH ROUTES ====
  register: {
    url: `${backendDomain}/api/auth/register`,
    method: "post",
  },
  login: {
    url: `${backendDomain}/api/auth/login`,
    method: "post",
  },
  verifyEmail: {
    url: `${backendDomain}/api/auth/verify-email`,
    method: "post",
  },
  logout: {
    url: `${backendDomain}/api/auth/logout`,
    method: "post",
  },
  forgotPassword: {
    url: `${backendDomain}/api/auth/forgot-password`,
    method: "post",
  },
  resetPassword: {
    url: `${backendDomain}/api/auth/reset-password`, // Token will be appended at call
    method: "post",
  },
  getUser: {
    url: `${backendDomain}/api/auth/get-user`,
    method: "get",
  },
  fetchUsers: {
    url: `${backendDomain}/api/auth/get-users`,
    method: "get",
  },
  deleteUser: {
    url: `${backendDomain}/api/auth/delete-user`, // User ID will be appended
    method: "delete",
  },
  updateUser: {
    url: `${backendDomain}/api/auth/update-user`, // User ID will be appended
    method: "post",
  },

  // ==== TODO ROUTES ====
  createTodo: {
    url: `${backendDomain}/api/todos/create-todo`,
    method: "post",
  },
  getTodos: {
    url: `${backendDomain}/api/todos/get-todos`,
    method: "get",
  },
  getTodoById: {
    url: `${backendDomain}/api/todos/get-todo`,
    method: "get",
  },
  editTodo: {
    url: `${backendDomain}/api/todos/edit-todo`,
    method: "put",
  },
  deleteTodo: {
    url: `${backendDomain}/api/todos/delete-todo`,
    method: "delete",
  },
  toggleCompleteTodo: {
    url: `${backendDomain}/api/todos/complete-todo`,
    method: "post",
  },
};
