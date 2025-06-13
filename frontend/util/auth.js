import { redirect, useNavigate } from "react-router-dom";

export function getAuthToken() {
  return localStorage.getItem("access_token");
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect(`/auth`);
  }

  return null; 
}

export function removeToken(){
  localStorage.removeItem("access_token");
  //revalidator.revalidate();
}
