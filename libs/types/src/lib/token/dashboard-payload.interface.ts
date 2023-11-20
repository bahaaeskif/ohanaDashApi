import { UserRole } from '../user'

export interface DashboardPayload {
    id: string
    username: string
    role: UserRole
}
