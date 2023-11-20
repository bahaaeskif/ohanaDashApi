import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { JwtHelperService } from './jwt-helper.service'

@Module({
    imports: [JwtModule],
    providers: [JwtHelperService],
    exports: [JwtHelperService],
})
export class JwtHelperModule {}
