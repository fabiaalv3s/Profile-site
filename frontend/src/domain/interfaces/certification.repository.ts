import { Certification } from '../entities/certification.entity'

export interface CertificationRepository {
  getCertifications(): Promise<Certification[]>
}
