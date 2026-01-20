import { Connection } from "mongoose"

declare global {
    //apni trf sai hm ny global ek ander mongoose Object bana lia hai  
    // jis k andr 2 properties hugi bas yee con and promis Or kuch nh daal sktyy bas
    var mongoose: {
        conn: Connection | null,
        promise: Promise<Connection> | null,
    }
}

export { } 
