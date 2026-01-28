import { ProfileRepository } from '@/domain/interfaces/profile.repository'
import { Profile } from '@/domain/entities/profile.entity'

export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}

  async getProfile(): Promise<Profile> {
    return this.profileRepository.getProfile()
  }
}
