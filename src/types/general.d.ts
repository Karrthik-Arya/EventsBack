// User.interface.ts
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  sessionToken: string;
  refreshToken: string;
  age?: number;
  gender?: string;
  image: string;
  about?: UserAbout;
  createdAt: Date;
  updatedAt: Date;
}

// Event.interface.ts
export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  eventTime: Date;
  owner: User;
  ownerId: string;
  groups?: Group[];
}

export interface Group {
  id: string;
  participants?: UserGroup[];
  host: User;
  hostId: string;
  event: Event;
  eventId: string;
  title: string;
  schedule: ScheduleItem[];
  image?: string;
}

export interface ScheduleItem {
  title: string;
  time: Date;
  about: string;
  venue: string;
}

// UserGroup.interface.ts
export interface UserGroup {
  user: User;
  userId: string;
  group: Group;
  groupId: string;
}

// UserAbout.interface.ts
export interface UserAbout {
  desc: string;
  interests: string[];
  opinions: string[];
  prompts: { [key: string]: string };
}
