export interface getPostResponseDTO {
  id: number;
  title: string;
  content: string;
  authorEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostRequestDTO {
  title: string;
  content: string;
}

export interface CreatePostResponseDTO {
  id: number;
  title: string;
  content: string;
  authorEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdatePostRequestDTO {
  title?: string;
  content?: string;
}