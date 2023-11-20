import {
    IsMatch,
    IsNotEmpty,
    IsNumberString,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from '@store/validators'

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    firstName: string

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    lastName: string

    @IsNotEmpty()
    @IsNumberString()
    @MinLength(1)
    @MaxLength(255)
    username: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    // @Matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
    //     {
    //         message: `Password must be: Min 1 uppercase letter, Min 1 lowercase letter, Min 1 special character, Min 1 number, Min 6 characters, Max 20 characters.`,
    //     },
    // )
    password: string

    @IsMatch('password')
    passwordConfirm: string
}
