import { createContext, useReducer } from "react"

// const savedUser = localStorage.getItem("auths");
// const user = savedUser ? JSON.parse(savedUser) : null;
const INIT_STATE = {
    // products:[],
    product:null,
    loading:false,
    success:false,
    error:null,
    cartAction:null,
    
}


export const ProductContext = createContext(INIT_STATE)

const ProductReducer = (state, action) => {
    switch (action.type) {
        
        case "CREATE_START":
            return {
                ...state,
                product: null,
                loading: true,
                error: null,
                success:false
            }
       
       
        case "CREATE_SUCCESS":
            return {
                ...state,
                product: action.payload,
                loading: false,
                error: null,
                success:true
            }

     
        case "CREATE_FAILURE":
            return {
                product: null,
                loading: false,
                error: action.payload,
                success:false
            }
            case "UPDATE_PRODUCT":
                return {
                    ...state,
                    product:action.payload
                };
            case "UPDATE_PRODUCT_AFTER_DELETE":
                return{
                    product:action.payload,
                    success:true,
                    error:null
                }
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


export const ProductContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(ProductReducer,INIT_STATE)


    return(
        <ProductContext.Provider value={{product:state.product, loading:state.loading, error:state.error, success:state.success,dispatch}}>
            {children}
        </ProductContext.Provider>
    )
}
