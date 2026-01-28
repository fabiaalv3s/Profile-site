import { Profile } from '../entities/profile.entity'

export interface ProfileRepository {
  getProfile(): Promise<Profile>
}
