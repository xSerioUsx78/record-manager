import apiEndpoint from "./utils";

const requests = {
    record: `${apiEndpoint}/record/`,
    recordDetail: (pk: number) => `${apiEndpoint}/record/${pk}/`,
    register: `${apiEndpoint}/users/register/`,
    login: `${apiEndpoint}/users/login/`,
    logout: `${apiEndpoint}/users/logout/`,
    sessionLogin: `${apiEndpoint}/users/session-login/`,
    sessionLogout: `${apiEndpoint}/users/session-logout/`,
    getUser: `${apiEndpoint}/users/user/`,
    getCsrfToken: `${apiEndpoint}/csrf_token/`
};

export default requests;