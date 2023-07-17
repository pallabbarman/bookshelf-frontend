import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "redux/hooks";

interface DecodedToken {
    id: string;
    email: string;
    role: string;
}

const useAuthUser = () => {
    const [authUser, setAuthUser] = useState<DecodedToken | null>(null);
    const { accessToken } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (accessToken) {
            try {
                const decodedToken = jwt_decode<DecodedToken>(accessToken);

                if (decodedToken) {
                    setAuthUser(decodedToken);
                } else {
                    toast.error("Invalid token");
                }
            } catch (error) {
                console.error("Error decoding access token:", error);
                setAuthUser(null);
            }
        }
    }, [accessToken]);

    return authUser;
};

export default useAuthUser;
