import { useQuery } from "react-query";
import { AuthForm, UserInfo } from "types/auth";
import { http, useHttp } from "./http";

const localStorageTokenKey = "__auth_provider_token__";
const localStoragePermissionKey = "__auth_provider_permission__";

export const getToken = () => window.localStorage.getItem(localStorageTokenKey);
export const getPermission = (): string[] => {
  const permissionStorage = window.localStorage.getItem(
    localStoragePermissionKey
  );
  return permissionStorage ? JSON.parse(permissionStorage) : [];
};

export const login = async (form: AuthForm) => {
  const { access_token: token, perms: permission } = await http(
    "/api/v1/admin/auth/login",
    {
      method: "POST",
      data: form,
    }
  );
  window.localStorage.setItem(localStorageTokenKey, token);
  window.localStorage.setItem(
    localStoragePermissionKey,
    JSON.stringify(permission)
  );
  return { token, permission };
};

export const logout = async () => {
  window.localStorage.removeItem(localStorageTokenKey);
  window.localStorage.removeItem(localStoragePermissionKey);
};

export const useUserInfo = () => {
  const client = useHttp();
  return useQuery<UserInfo>(["useInfo"], () => client("/api/v1/admin/auth/me"));
};
