import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url ="http://localhost:4000";
    const [token,setToken] = useState("");

    const [food_list,setFoodList] = useState([])
    const [dodatki_list, setDodatkiList] = useState([]); // Add dodatki_list state

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }


    const getDodatkiTotal = () => {
        let totalAmount = 0;
        dodatki_list.forEach(item => {
          if (cartItems[item._id] > 0) {
            totalAmount += item.price * cartItems[item._id];
          }
        });
        return totalAmount;
      };

      const getFoodTotal = () => {
        let totalAmount = 0;
        food_list.forEach(item => {
          if (cartItems[item._id] > 0) {
            totalAmount += item.price * cartItems[item._id];
          }
        });
        return totalAmount;
      };


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (!itemInfo) { // If not found in food_list, check dodatki_list
                    itemInfo = dodatki_list.find((product) => product._id === item);
                }
                if (itemInfo) { // Add this check to ensure itemInfo is defined
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }
    

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList (response.data.data)
    }

    const fetchDodatkiList = async () => {
        try {
            const response = await axios.get(url + "/api/dodatki/listDod");
            setDodatkiList(response.data.data);
        } catch (error) {
            console.error("Error fetching dodatki list:", error);
        }
    };


    const loadCartdata = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            await fetchDodatkiList(); // Fetch dodatki list when component mounts
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartdata(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);
    const contextvalue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getDodatkiTotal,
        getFoodTotal,
        getTotalCartAmount,
        url,
        token,
        setToken,
        dodatki_list // Include dodatki_list in context value
    }
    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider