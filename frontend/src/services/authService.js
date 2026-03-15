import Register from "../pages/Register";
import api from "./api";

export const authService = {
    login(email, password) {
        return api.post("/auth/login", {
            email,
            password
        });
    },
    Register(nombre, email, password) {
        return api.post("/auth/register", {
            nombre,
            email,
            password
        });
    }
};