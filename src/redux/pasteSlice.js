import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes")) // Fixed here
  : []

  }

  export const pasteSlice = createSlice({
    name:'paste',
    initialState,
    reducers: {
     addToPastes: (state,action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes",JSON.stringify(state.pastes));
      toast("Paste Created Successfully");
    },
     updateToPastes: (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item)=>
      item._id === paste._id);

      if(index >= 0){
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Updated");
      }
    },
     resetToPastes: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload; // Get the ID from action payload
      const index = state.pastes.findIndex((item) => item._id === pasteId);
    
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      }
    },
    sharePaste: (_, action) => {
      const pasteId = action.payload;
      const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
      
      navigator.clipboard.writeText(shareableLink);
      toast.success("Shareable link copied!");
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetToPastes, removeFromPastes, sharePaste  } = pasteSlice.actions

export default pasteSlice.reducer