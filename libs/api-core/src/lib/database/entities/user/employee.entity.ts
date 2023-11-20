import { Column, Entity } from 'typeorm'

import { UserRole } from '@store/types'

import { BaseUser } from './base-user.entity'

@Entity({ orderBy: { role: 'DESC', createdAt: 'DESC' } })
export class Employee extends BaseUser {
    @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
    role: UserRole
}
