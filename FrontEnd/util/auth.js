import { redirect } from "react-router-dom";
import listOfLinks from "../src/links";

export function getAuthToken() {
  return localStorage.getItem("access_token");
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect(`/${listOfLinks.auth}`);
  }

  return null; 
}
