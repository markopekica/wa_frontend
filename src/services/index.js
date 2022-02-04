import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:3000",
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

Service.interceptors.response.use( (response, ) => response, (error) => {
  if( error.response.status == 401 || error.response.status == 403 ){
    Auth.logout( )
  }
})

let Activities = {
  async create(data) {
    let serverData = {
      name: data.name,
      color: data.color,
      userName: data.userName
    };

    await Service.post("/activities", serverData);
    return;
  },
  async getAll(usa) {
    let act = await Service.get("/activities")

    let jakoLose = []
    act.data.forEach( e => {
      if(e.userName == usa){
        jakoLose.push(e)
      }
    })
    return jakoLose;
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
      activityId: data.activityId
    };
    await Service.post("/sessions", serverData);
    return;
  },
  async getAll(activities) {
    let ses = await Service.get("/sessions")
    let ar = []
    console.log("activities: ", activities)
    ses.data.forEach( ses => {
      activities.forEach( act => {
        if( ses.activityId == act._id ){
          ar.push(ses)
        }
      })
    })
    return ar
  },
};

let Auth = {
  async signUp(username, password, repeatPassword) {
    let response = await Service.post("/users", {
      username: username,
      password: password,
      repeatPassword: repeatPassword
    })

    console.log("index.js", response)

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
    get userEmail( ){
      let user = Auth.getUser( )
      if( user ){
        return user.username
      }
    }
  },
};

export { Service, Activities, Sessions, Auth };
