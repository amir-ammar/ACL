import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/App/appContext";
import { backendApi } from "../../projectConfig";


function useWallet(props){
    const { token, user } = useAppContext();
    const [wallet,setWallet] = useState();
    useEffect(() => {
        let url = `${backendApi}user/wallet/${user._id}`;
        axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                console.log("wallet", res.data);
                if (res.data) {
                    console.log("balance", res.data.balance);
                    setWallet(res.data.balance);
                }
            })
            .catch(err => console.log(err));
    }, [])
    return wallet;
}

export default useWallet;

