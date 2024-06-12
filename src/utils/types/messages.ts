export type MessageType = {
  message_id: string;
  message: string;
  author_id: string;
  author?: {
    username: string;
    avatar: string;
  };
  receiver_id: string;
  created_at: string;
};
