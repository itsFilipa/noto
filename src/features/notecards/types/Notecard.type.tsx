type Visibility = "public" | "private";

export interface NotecardProps {
  id: string;
  title?: string;
  text?: string;
  tags?: string[];
  inlineLinks: number;
  createdAt: string;
  lastModifiedAt: string;
  likes: number;
  forks: number;
  visibility: Visibility;
  author: string;
}

export interface NotecardEntity {
  notecard: NotecardProps;
}

export interface NotecardEntityArray {
  notecards: NotecardProps[];
}