import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import {axiosClient} from '../../utils/axiosClient'
import { setLoading } from './appConfigSlice';

export const getFeedData = createAsyncThunk('user/getFeedData', async(__,thunkAPI)=> {
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.get("/user/getFeedData");
        console.log("userProfile" ,response);
        return response.result;

        //console.log('api called' ,result );
    } catch (error) {
        return Promise.reject(error);
    }finally{
        thunkAPI.dispatch(setLoading(false));
    }
})

export const likeAndUnlikePost = createAsyncThunk('post/likeAndUnlike' , async(body,thunkAPI) => {
    try {

        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.post("/posts/like", body);
        console.log("userProfile" ,response);
        return response.result.post;
        
    } catch (error) {
        return Promise.reject(error);
    }
    finally{
        thunkAPI.dispatch(setLoading(false));
    }
})

export const followAndUnFollow = createAsyncThunk('user/followAndUnfollow' , async(body,thunkAPI) => {
    try {

        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.post("/user/follow", body);
        console.log(response.result)
        return response.result.user;
        
    } catch (error) {
        return Promise.reject(error);
    }
    finally{
        thunkAPI.dispatch(setLoading(false));
    }
})




const feedSlice = createSlice({
    name : 'feedSlice',

    initialState :{
        feedData: {}
    },

    extraReducers : (builder) => {
        builder.addCase(getFeedData.fulfilled, (state,action) => {
            state.feedData = action.payload;
        })
        .addCase(likeAndUnlikePost.fulfilled ,(state,action)=>{
            const post = action.payload;
            const index = state.feedData.posts.findIndex(item=> item._id === post._id);
            if(index != undefined && index != -1){
                state.feedData.posts[index] = post;
            }

        })
        .addCase(followAndUnFollow.fulfilled, (state, action) => {

            const user = action.payload;
            const index = state?.feedData?.followings.findIndex(item => item._id === user._id);
            if(index != -1){
                  state?.feedData.followings.splice(index, 1);
            }
            else{
                state?.feedData.followings.push(user);
            }

        })
    }
})

    
    export default feedSlice.reducer;