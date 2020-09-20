import { combineReducers } from "redux";
import RegisterReducer from "./RegisterReducer";
import LoginReducer from "./LoginReducer";
import CreateRoomReducer from "./CreateRoomReducer";
import JoinRoomReducer from "./JoinRoomReducer";
import SendMessageReducer from "./SendMessageReducer";
import GetMessagesReducer from "./GetMessagesReducer";
import AppbarReducer from "./AppbarReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
  RegisterReducer,
  LoginReducer,
  CreateRoomReducer,
  JoinRoomReducer,
  SendMessageReducer,
  GetMessagesReducer,
  AppbarReducer,
  UserReducer,
});

export default rootReducer;
