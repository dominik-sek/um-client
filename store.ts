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
	logout: () => void;
	updateMessageState: (chatroom: IChatroom) => void;
}
export interface INotifStore{
	unreadCount: {[key: number]: number};
	totalUnreadCount: number;
	updateUnreadCount: (chatroomId: number, count: number) => void;
	updateTotalUnreadCount: (count: number) => void;
}


export interface Message {
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
	unreadCount: {},
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
	addMessage: (message) => {
		const chatrooms = get().chatrooms;
		const chatroom = chatrooms.find((chatroom)=> chatroom.id === message.chatroom_id);
		if(chatroom){
			chatroom.message = [message, ...chatroom.message];
		}
		set({chatrooms: chatrooms});
	},
	updateMessageState: (chatroomToUpdate) => {
		const chatrooms = get().chatrooms;
		const chatroom = chatrooms.find((chatroom)=> chatroom.id === chatroomToUpdate.id);
		if(chatroom){
			chatroom.message = chatroomToUpdate.message;
		}
		set({chatrooms: chatrooms});
	},
	logout: ()=>{
		set(initialChatroomState);
	}
});
const notifStore = (set:any, get:any): INotifStore => ({
	unreadCount: {},
	totalUnreadCount: 0,
	updateUnreadCount: (chatroomId, count) => {
		const unreadCount = get().unreadCount;
		unreadCount[chatroomId] = count;
		set({unreadCount: unreadCount});
	},
	updateTotalUnreadCount: (count) => {
		set({totalUnreadCount: count});
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
