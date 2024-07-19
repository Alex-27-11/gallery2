export interface ServerResponse {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
  author?: string;
  location?: string;
}
export interface ServerResponseAuthor {
  id: number;
  name: string;
}
export interface ServerResponseLoc {
  id: number;
  location: string;
}
