import { $host } from ".";
// import store from "../store"; // TODO: this is statemanager

export const exampleLogin = async (email: string, password: string) => {
  const response = await $host.post("/your/path", { email, password });
  return response.data; //here is json response
};

export const exampleReg = async (
  email: string,
  login: string,
  password: string
) => {
  const response = await $host.post("/your/path", { email, login, password });
  return response.data; //here is json response
};
// exaple ude statemanager for get token
// export const getUser = async (email: string, password: string) => {
//   const token = store.getState().settings.token;

//   const response = await $host.get(
//     `/auth/me?email=${email}&password=${password}`
//   );
//   return response.data;
// };
