import {
    IsMatch,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from '@store/validators'

export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    oldPassword: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
        {
            message: `Password must be: Min 1 uppercase letter, Min 1 lowercase letter, Min 1 special character, Min 1 number, Min 6 characters, Max 20 characters.`,
        },
    )
    newPassword: string

    @IsMatch('newPassword')
    newPasswordConfirm: string
}
