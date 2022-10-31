
/* This file must be in the wwwroot folder. */

export const getWidth = () => {
    console.log("isolated") /* only to prove it is being called */
    return window.innerWidth
}


// another way to accomplish the same with a javascript function instead of a const:

//export function getWidth() {
//    console.log("isolated");
//    return window.innerWidth;
//}