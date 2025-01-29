import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

export const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutWriter = () => {

        localStorage.removeItem("authToken");
        dispatch(logout());
        navigate('/')
    }

    return logoutWriter;
}

