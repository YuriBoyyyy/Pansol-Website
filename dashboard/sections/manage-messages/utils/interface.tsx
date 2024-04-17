import { Timestamp } from "firebase/firestore";

export interface ConversationData {
  sender_info: {
    username: string;
    avatar: string;
    email: string;
  };
  latest_message: string;
  receiver: string;
  date: Timestamp;
  seen_by_resident: boolean;
  seen_by_admin: boolean;
}

export interface ConversationModel {
  conversationData: ConversationData;
  id: string;
}
