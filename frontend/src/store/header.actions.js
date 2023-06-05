import { SET_HEADER_SCALES } from "./header.reducer.js";
import { store } from "./store.js";

export function setHeaderScales(scales){
    store.dispatch({type:SET_HEADER_SCALES, scales})
}