import axios from "axios";

let Service = axios.create({
  /* baseURL: "https://calm-harbor-09665.herokuapp.com", */
  baseURL: "http://localhost:3000/",
  timeout: 1000,
}); // variabla za komunikaciju s backend-om

Service.interceptors.request.use((request) => {
  try {
    request.headers["Authorization"] = "Bearer " + Auth.getToken();
  } catch (e) {
    console.error(e);
  }
  return request;
});

Service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      Auth.logout();
    }
  }
);

let Activities = {
  async create(data) {
    let serverData = {
      name: data.name,
      color: data.color,
      userName: data.userName,
    };
    await Service.post("/activities", serverData);
    return;
  },

  async getAll(usa) {
    let act = await Service.get("/activities");

    let jakoLose = [];
    act.data.forEach((e) => {
      if (e.userName == usa) {
        jakoLose.push(e);
      }
    });
    return jakoLose;
  },

  async deleteOne(id, data) {
    let response = await Service.delete(`/activities/${id}`, data);
    return response;
  },
};

let Tasks = {
  async create(data) {
    let serverData = {
      name: data.name,
      color: data.color,
      userName: data.userName,
      tags: data.tags,
    };
    await Service.post("/tasks", serverData);
    return;
  },

  async getAll(usr) {
    let tasks = await Service.get("/tasks");

    let t = [];

    tasks.data.forEach((e) => {
      if (e.userName == usr) {
        t.push(e);
      }
    });

    return t;
  },

  async updateOne(id, data) {
    console.log("id: ", id, "\ndata: ", data);
    let response = await Service.patch(`/task/${id}`, data);
    return response;
  },

  async saveTask(data) {
    let response = await Service.post("/taskSessions", data);
    return response;
  },
};

let TaskSessions = {
  async getAll(usr) {
    let taskSessions = await Service.get("/taskSessions");
    let l = [];
    taskSessions.data.forEach((e) => {
      if (e.userName == usr) {
        l.push(e);
      }
    });
    return l;
  },

  async getAllForChart(tasks) {
    let t = await Service.get("/taskSessions");
    let l = [];
    /* console.log("tasks: ", tasks) */
    /* console.log("t: ", t) */
    /* console.log("tasks: ", tasks) */
    /* console.log("t: ", t); */
    tasks.forEach((o) => {
      t.data.forEach((e) => {
        /* console.log("e: ", e) */
        /* console.log(o._id == e.taskId) */

        if (o._id == e.taskId) {
          /* console.log("tru: ") */
          l.push(e);
        }
      });
    });
    /* console.log("l: ", l) */
    return l;
  },
};

let Sessions = {
  async create(data) {
    let serverData = {
      name: data.name,
      date: data.date,
      startTime: data.startedAt,
      minutes: data.minutes,
      isRest: data.isRest,
      activityId: data.activityId,
    };
    await Service.post("/sessions", serverData);
    return;
  },

  async getAll(activities) {
    let ses = await Service.get("/sessions");
    let ar = [];
    /* console.log("activities: ", activities) */
    /* console.log("ses: ", ses); */
    ses.data.forEach((ses) => {
      activities.forEach((act) => {
        if (ses.activityId == act._id) {
          ar.push(ses);
        }
      });
    });
    /* console.log("ar: ", ar) */
    return ar;
  },
};

let Options = {
  async save(data) {
    /* console.log("data: ", data) */
    /* let options = {
      workMinutes: data.workMin,
      restMinutes: data.restMin,
      userName: data.userName
    } */
    return await Service.post("/options", data);
  },

  async getOptions(usr) {
    let opt = await Service.get("/options");

    let f;

    /* console.log("opt: ", opt) */

    opt.data.forEach((e) => {
      /* console.log("username: ", e.userName)
      console.log("usr: ", usr) */
      /* console.log(e.userName == usr) */
      if (e.userName == usr) {
        /* console.log("e: ", e) */
        f = e;
        //return e; nije radilo
      }
    });

    /* console.log("f: ", f) */

    return f;
  },

  async updateOptions(id, data) {
    return await Service.patch(`/options/${id}`, data);
  },
};

let Auth = {
  async signUp(username, password, repeatPassword) {
    let response = await Service.post("/users", {
      username: username,
      password: password,
      repeatPassword: repeatPassword,
    });
    let user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  },

  async signIn(username, password) {
    let response = await Service.post("/auth", {
      username: username,
      password: password,
    });
    let user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  },

  logout() {
    localStorage.removeItem("user");
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  getToken() {
    let user = Auth.getUser();
    if (user && user.token) {
      return user.token;
    } else {
      return false;
    }
  },

  authenticated() {
    let user = Auth.getUser();
    if (user && user.token) {
      return true;
    }
    return false;
  },

  state: {
    get authenticated() {
      return Auth.authenticated();
    },
    get userEmail() {
      let user = Auth.getUser();
      if (user) {
        return user.username;
      }
    },
  },
};

export { Service, Activities, Sessions, Auth, Tasks, Options, TaskSessions };
