import { Song } from './song.model';
import { UserProfile } from './user-profile.model';

export class Album {
  id:string;
  name: string;
  description: string;
  userId: string;
  user:UserProfile;
  image: string;
  creationDate:string;
  songs:Song[];
}
