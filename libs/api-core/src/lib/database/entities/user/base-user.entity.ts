import { Column } from 'typeorm'

import { BaseEntity } from '../base.entity'

export class BaseUser extends BaseEntity {
    @Column({ length: 255 })
    firstName: string

    @Column({ length: 255 })
    lastName: string

    @Column({ length: 255, unique: true })
    username: string

    @Column({ length: 1024 })
    password: string
}
