import { createContext, useReducer } from "react"

// const savedUser = localStorage.getItem("auths");
// const user = savedUser ? JSON.parse(savedUser) : null;
const INIT_STATE = {
    order:null,
    isLoading:false,
    isError:false
    
}


export const OrderContext = createContext(INIT_STATE)

const OrderReducer = (state, action) => {
    switch (action.type) {
        
        case "CREATE_ORDER_START":
            return {
                order:null,
                isLoading: true,
                isError: null,
            }
       
       
        case "CREATE_ORDER_SUCCESS":
            return {
                order: action.payload,
                isLoading: false,
                isError: null,
            }

     
        case "CREATE_ORDER_FAILURE":
            return {
                order:null,
                isLoading: false,
                isError: action.payload,

            }

        
            // case "UPDATE_ORDER":
            //     return {
            //         ...state,
            //         product: action.payload
            //     };

            // case "ADD_TO_CART":
            // case "INCREASE_CART":
            // case "DECREASE_CART":
            //     return{
            //         cartAction:action.payload,
                    
            //     }
        default:
            return state
    }
}


export const OrderContextProvider = ({children})=>{
    const [state,orderdispatch] = useReducer(OrderReducer,INIT_STATE)


    return(
        <OrderContext.Provider value={{product:state.product, loading:state.loading, error:state.error, success:state.success,orderdispatch}}>
            {children}
        </OrderContext.Provider>
    )
}
