import { IsEmail, IsMobilePhone, IsString, Matches, MinLength, IsNumberString } from "class-validator";
import { Match } from "src/common/decorators/match";
import { CreditNumber } from "src/common/decorators/credit-number";

export class CreateUserDto {
    @IsEmail({},{message: 'ایمیل به درستی وارد نشده است'})
    email: string;

    @IsString({message: 'پسورد باید به صورت حروف وارد شود'})
    @MinLength(8, {message: 'پسورد باید حداقل ۸ کارکتر باشد'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'پسورد ضعیف است'})
    password: string;

    @IsString({message: 'تایید پسورد باید به صورت حروف وارد شود'})
    @Match('password', {message: 'تایید پسورد و پسورد با هم مطابقت ندارند'})
    passwordConfirm: string;

    @CreditNumber({message: 'مقدار ورودی باید عدد باشد'})
    credit: string;

    profilePicture: string;

    @IsMobilePhone(['fa-IR'],{}, {each: true, message: 'فرمت شماره موبایل اشتباه است'})
    phoneNumber: string[];
}
