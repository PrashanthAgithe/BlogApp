//create redux slice
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
// make htttp req using redux-thunk middleware
export const userAuthorLoginThunk =createAsyncThunk('user-author-login',async(userobj,thunkapi)=>{
  try{
    if(userobj.userType==='user'){
      let res=await axios.post(`${process.env.REACT_APP_API_URL}/user-api/login`,userobj)
      if(res.data.message==='login success'){
        //store token in the local storage
        localStorage.setItem('token',res.data.token);
      }else{
        return thunkapi.rejectWithValue(res.data.message);
      }
      return res.data;
    }
    if(userobj.userType==='author'){
      let res=await axios.post(`${process.env.REACT_APP_API_URL}/author-api/login`,userobj)
      if(res.data.message==='login success'){
        //store token in the local storage
        localStorage.setItem('token',res.data.token);
      }else{
        return thunkapi.rejectWithValue(res.data.message);
      }
      return res.data;
    }
  }catch(err){
    return thunkapi.rejectWithValue(err);
  }
})
export const userAuthorSlice=createSlice({
  name:'user-author-login',
  initialState:{
    isPending:false,
    islogedin:false,
    currentUser:{},
    errorOccurred:false,
    errMsg:''
  },
  reducers:{
    resetState:(state,action)=>{
      state.isPending=false;
      state.islogedin=false;
      state.currentUser={};
      state.errorOccurred=false;
      state.errMsg='';
    }
  },
  extraReducers: builder=>builder
  .addCase(userAuthorLoginThunk.pending,(state,action)=>{
    state.isPending=true;
  })
  .addCase(userAuthorLoginThunk.fulfilled,(state,action)=>{
    state.isPending=false;
    state.currentUser=action.payload.user;
    state.islogedin=true;
    state.errMsg='';
    state.errorOccurred=false;
  })
  .addCase(userAuthorLoginThunk.rejected,(state,action)=>{
    state.isPending=false;
    state.currentUser={};
    state.islogedin=false;
    state.errMsg=action.payload;
    state.errorOccurred=true;
  })
})

//export the action creater function
export const {resetState}=userAuthorSlice.actions;
//export root reducer of the slice
export default userAuthorSlice.reducer;