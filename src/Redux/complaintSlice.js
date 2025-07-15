import { createSlice } from "@reduxjs/toolkit";
const complaintSlice = createSlice({
    name:"complaintSlice",
    initialState:{
        myComplaints : [],
        allComplaints :[],
        loading:false,

    },
    reducers:{
        setloading:(state,action)=>{
            state.loading =action.payload;
        },
        setmyComplaints:(state,action)=>{
            state.myComplaints =action.payload;
        },
        setallComplaints:(state,action)=>{
            state.allComplaints =action.payload;
        },

    }
});
export const{setmyComplaints , setallComplaints, setloading} = complaintSlice.actions;
export default complaintSlice.reducer;