import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createTweet } from "@/actions/tweet.actions";
import { replyTweet } from "@/actions/reply.actions";
import { IReply, ITweet } from "@/types/tweet.interface";

interface TweetFormState {
  loading: boolean;
  error: string | null;
  success: boolean;
  tweets: ITweet[];
  replies: IReply[];
}

const initialState: TweetFormState = {
  loading: false,
  error: null,
  success: false,
  tweets: [],
  replies: [],
};

// Thunk action for creating a tweet
export const createTweetAsync = createAsyncThunk(
  "tweetForm/createTweet",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await createTweet(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action for replying to a tweet
export const replyTweetAsync = createAsyncThunk(
  "tweetForm/replyTweet",
  async (
    { formData, id }: { formData: FormData; id: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await replyTweet(formData, id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tweetFormSlice = createSlice({
  name: "tweetForm",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createTweetAsync
      .addCase(createTweetAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createTweetAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.success = true;
          state.tweets.push(action.payload);
        }
      )
      .addCase(
        createTweetAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      // Handle replyTweetAsync
      .addCase(replyTweetAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        replyTweetAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.success = true;
          state.replies.push(action.payload);
        }
      )
      .addCase(
        replyTweetAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { resetState } = tweetFormSlice.actions;

export default tweetFormSlice.reducer;
