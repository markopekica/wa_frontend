import axios from "axios";

let Service = axios.create({
  baseURL: "https://calm-harbor-08314.herokuapp.com/",
  /* baseURL: "http://localhost:3000/", */
  timeout: 1000,
});

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
    tasks.forEach((o) => {
      t.data.forEach((e) => {
        if (o._id == e.taskId) {
          l.push(e);
        }
      });
    });
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
    ses.data.forEach((ses) => {
      activities.forEach((act) => {
        if (ses.activityId == act._id) {
          ar.push(ses);
        }
      });
    });
    return ar;
  },
};

let Options = {
  async save(data) {
    return await Service.post("/options", data);
  },

  async getOptions(usr) {
    let opt = await Service.get("/options");

    let f;

    opt.data.forEach((e) => {
      if (e.userName == usr) {
        f = e;
      }
    });

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
