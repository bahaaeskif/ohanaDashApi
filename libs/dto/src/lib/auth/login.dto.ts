import {
    IsNotEmpty,
    IsNumberString,
    IsString,
    MaxLength,
} from '@store/validators'

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    // @IsNumberString()
    @MaxLength(255)
    username: string

    @IsNotEmpty()
    @IsString()
    // @MinLength(6)
    // @MaxLength(20)
    // @Matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
    // )
    password: string
}
