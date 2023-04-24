import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserData } from './src/types/User';

export interface IAuthStore {
	auth: boolean;
	setAuth: (auth: boolean) => void;
	role: string;
	setRole: (role: string) => void;
	logout: () => void;
}

export interface IUserStore {
	user: UserData;
	setUser: (user: UserData) => void;
	clearUser: () => void;
}

export interface IChatroomStore {
	chatrooms: IChatroom[];
	setChatrooms: (chatrooms: IChatroom[]) => void;
	addChatroom: (chatroom: IChatroom) => void;
	addMessage: (message: Message) => void;
	deleteChatroom: (chatroomId: number) => void;
	logout: () => void;
	updateMessageState: (chatroom: IChatroom) => void;
}
export interface INotifStore{
	unreadCount: {
		chatroomId: number;
		count: number;
	}
	totalUnreadCount: number;
	updateUnreadCount: (chatroomId: number, count: number) => void;
	updateTotalUnreadCount: (count: number) => void;
	logout: () => void;
}


export interface Message {
	id: number;
	sender_id: number;
	chatroom_id: number;
	content: string;
	sent_at: Date;
	status: "sent" | "unread" | "read" ;
}
export interface IChatroom {
	id: number;
	created_by: number;
	created_at: Date;
	last_activity: Date;
	chatroom_user: ChatroomUser[];
	message: Message[];
}

export interface ChatroomUser {
    account: {
		account_images:{
			avatar_url: string;
		},
		person: {
			first_name: string;
			last_name: string;
		}
	}
	id: number;
	chatroom_id: number;
	user_id: number;
}


const initialAuthState = {
	auth: false,
	role: '',
};
const initialUserState = {
	user: {} as UserData,
};
const initialChatroomState = {
	chatrooms:[],
	unreadCount: {},
	totalUnreadCount: 0,
}
// unreadMessages [
//   { chatroom_id: 89, unread_count: 6 },
//   { chatroom_id: 90, unread_count: 4 }
// ]
const initialNotifState = {
	unreadCount: {
		chatroomId: 0,
		count: 0,
	},
	totalUnreadCount: 0,
}


const authStore = (set: any): IAuthStore => ({
	auth: false,
	setAuth: (auth) => set({ auth }),
	role: '',
	setRole: (role) => set({ role }),
	logout: () => {
		set(initialAuthState);
	},
});
const userStore = (set: any, get: any): IUserStore => ({
	user: {} as UserData,
	setUser: (user) => set({ user: user }),
	clearUser: () => {
		set(initialUserState);
	},
});
const chatroomStore = (set:any, get:any): IChatroomStore => ({
	chatrooms: [],
	addChatroom: (chatroom) => set({chatrooms: [chatroom,...get().chatrooms]}),
	setChatrooms: (chatrooms) => set({chatrooms: chatrooms}),
	deleteChatroom: (chatroomId) => {
		const chatrooms = get().chatrooms;
		const updatedChatrooms = chatrooms.filter((chatroom: { id: number; }) => chatroom.id !== chatroomId);
		set({ chatrooms: updatedChatrooms });
	},
	addMessage: (message) => {
		const chatrooms = get().chatrooms;
		const updatedChatrooms = chatrooms.map((chatroom: { id: number; message: any; }) => {
			if (chatroom.id === message.chatroom_id) {
				return {
					...chatroom,
					message: [message, ...chatroom.message],
				};
			}
			return chatroom;
		});

		set({ chatrooms: updatedChatrooms });
	},
	updateMessageState: (chatroomToUpdate) => {
		const chatrooms = get().chatrooms;
		const updatedChatrooms = chatrooms.map((chatroom: { id: number; }) => {
			if (chatroom.id === chatroomToUpdate.id) {
				return {
					...chatroom,
					message: chatroomToUpdate.message,
				};
			}
			return chatroom;
		});
		set({ chatrooms: updatedChatrooms });
	},

	logout: ()=>{
		set(initialChatroomState);
	}
});

const notifStore = (set:any, get:any): INotifStore => ({
	unreadCount: {
		chatroomId: 0,
		count: 0,
	},
	totalUnreadCount: 0,
	updateUnreadCount: (chatroomId, count) => {
		set({unreadCount: {chatroomId: chatroomId, count: count}});
	},
	updateTotalUnreadCount: (count) => {
		set({totalUnreadCount: count});
	},
	logout: ()=>{
		set(initialNotifState);
	}
})

export const useUserStore = create<IUserStore>()(
	persist(userStore, { name: 'user' }),
);
export const useAuthStore = create<IAuthStore>()(
	persist(authStore, { name: 'auth' }),
);
export const useChatroomStore = create<IChatroomStore>()(
	persist(chatroomStore, { name: 'chatroom' }),
);
export const useNotifStore = create<INotifStore>()(
	persist(notifStore, { name: 'notif' }),
);
