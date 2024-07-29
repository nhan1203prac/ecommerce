import { createContext, useEffect, useReducer } from "react"

// const savedUser = localStorage.getItem("auths");
// const user = savedUser ? JSON.parse(savedUser) : null;
const INIT_STATE = {
    user:JSON.parse(localStorage.getItem("users")) || null,
    loading:false,
    error:null,
}


export const UserContext = createContext(INIT_STATE)

const UserReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
        case "REGISTER_START":
            return {
                user: null,
                loading: true,
                error: null
            }
            
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            }

        case "LOGIN_FAILURE":
        case "REGISTER_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }

        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            }
        case "UPDATE_USER":
            return{
                user: action.payload,
                loading: false,
                error: null
            }
        case "INCREASE_CART":
        case "DECREASE_CART":
        case "REMOVE_FROM_CART":
            return{
                user:action.payload,
                loading:false,
                error:null
            }
        
            case "ADD_NOTIFICATION":
                // Tạo bản sao của mảng notifications và thêm thông báo mới vào đầu mảng
                const updatedNotifications = [action.payload, ...state.user.notifications];
                
                // Trả về trạng thái mới với mảng notifications đã được cập nhật
                return {
                    ...state,
                    user: {
                        ...state.user,
                        notifications: updatedNotifications
                    }
                };
            
        default:
            return state
    }
}


export const UserContextProvider = ({children})=>{
    const [state,dispatchUser] = useReducer(UserReducer,INIT_STATE)

    useEffect(()=>{
        localStorage.setItem("users", JSON.stringify(state.user));
    });

    return(
        <UserContext.Provider value={{user:state.user, loading:state.loading, error:state.error, dispatchUser}}>
            {children}
        </UserContext.Provider>
    )
}
