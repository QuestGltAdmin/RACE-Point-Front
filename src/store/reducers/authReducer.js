import { createSlice } from "@reduxjs/toolkit";

const isUserAuthenticated = localStorage.getItem("isUserAuthenticated");
const userData = localStorage.getItem("userData");
const usertoken = localStorage.getItem("usertoken");

const WalletEVM = localStorage.getItem("WalletEVM");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    isUserAuthenticated: !!isUserAuthenticated ? true : false,
    user: !!userData ? JSON.parse(userData) : {},
    usertoken: !!usertoken ? JSON.parse(usertoken) : {},
    WalletEVM:
      !!WalletEVM && WalletEVM !== "undefined" ? JSON.parse(WalletEVM) : {},
  },

  reducers: {
    loginSaga: (state, action) => {
      return { ...state };
    },

    userLoginSaga: (state, action) => {
      return { ...state };
    },

    userLoginStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    setUserprofileData: (state, action) => {
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    },

    userloginSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: true,
        user: action.payload,
        authToken: action.payload.token,
      };
    },

    userWalletLogin: (state, action) => {
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem(
        "isUserAuthenticated",
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        isUserAuthenticated: true,
        user: action.payload,
      };
    },
    // isLogin: (state, action) => {

    //   // console.log(action,"action")
    //   return {
    //     ...state,
    //     isUserAuthenticated: true,
    //     user: action.payload,
    //   };
    // },
    userLoginFail: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: false,
        user: {},
        errorMsg: action.payload,
      };
    },

    adminLoginSaga: (state, action) => {
      return { ...state };
    },

    adminLoginStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    adminloginSuccess: (state, action) => {
      localStorage.setItem("userData" , JSON.stringify(action?.payload))
      localStorage.setItem("isUserAuthenticated" , true)
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: true,
        user: action.payload,
        authToken: action.payload.token,
      };
    },

    adminLoginFail: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: false,
        user: {},
        errorMsg: action.payload,
      };
    },

    setEVMWallet: (state, action) => {
      localStorage.setItem("WalletEVM", JSON.stringify(action.payload));
      // console.log(action.payload,"ppp")
      return {
        ...state,
        WalletEVM: action.payload,
      };
    },

    logout: (state) => {
      localStorage.clear();
      localStorage.setItem("dashboardModal", false);
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: false,
        user: {},
        WalletEVM: {},
        usertoken: {},
      };

    },

    registerSaga: (state, action) => {
      return { ...state };
    },

    registerStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    registerSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        signupData: action.payload,
        errorMsg: "",
      };
    },

    registerFail: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        signupData: {},
        errorMsg: action.payload,
      };
    },
  },
});

export const {
  logout,
  registerSaga,
  registerSuccess,
  registerStart,
  registerFail,
  setUserprofileData,
  setEVMWallet,
  userLoginSaga,
  userLoginStart,
  userloginSuccess,
  userLoginFail,
  userWalletLogin,
  adminLoginSaga,
  adminLoginStart,
  adminloginSuccess,
  adminLoginFail,
  isLogin,
} = authSlice.actions;

export default authSlice.reducer;
