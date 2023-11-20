import { Entity } from 'typeorm'

import { BaseUser } from './base-user.entity'

@Entity({ orderBy: { createdAt: 'DESC' } })
export class Customer extends BaseUser {}
