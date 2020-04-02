import { UiUserListItem } from './UiUserListItem';
import { UiRoleListItem } from './UiRoleListItem';

export class UiUserDetails extends UiUserListItem {
    public Password: string;
    public Password2: string;
    public Roles: UiRoleListItem[];

    public PasswordIsValid: boolean = true;
    public PasswordsMatch: boolean = true;
    public PasswordValidated: boolean = false;
    public PasswordMatchValidated: boolean = false;

    public isPasswordFormatValid() : boolean {
        if(this.Password.length <8) return false;
        
        let regexpLowerCase = new RegExp('[a-z]');
        if(!regexpLowerCase.test(this.Password)){
            console.log("fail 1");
            return false;
        }

        let regexpUpperCase = new RegExp('[A-Z]');
        if(!regexpUpperCase.test(this.Password)){
            console.log("fail 2");
            return false;
        }

        let regexpDigit = new RegExp('[0-9]');
        if(!regexpDigit.test(this.Password)){
            console.log("fail 3");
            return false;
        }

        let regexpSpecial = new RegExp('[?!@#$%^&*]');
        if(!regexpSpecial.test(this.Password)){
            console.log("fail 4");
            return false;
        }
        return true;
    }
    
    public validate() : boolean{
        this.PasswordMatchValidated = false;
        this.PasswordValidated = false;
        this.PasswordIsValid = true;
        let allGood = super.validate();
        if(this.Id === 'new' && (this.Password == null || this.Password.trim() === '' || !this.isPasswordFormatValid())){
            this.PasswordValidated = true;
            this.PasswordIsValid = false;
            allGood = false;
        }

        if((this.Password != null && this.Password.trim() !== '') ||
            (this.Password2 != null && this.Password2.trim() !== '')
        ){
            this.PasswordValidated = true;
            this.PasswordMatchValidated = true;
            if(this.Password != this.Password2){
                allGood = false;
                this.PasswordsMatch = false;
                this.PasswordValidated = true
            }
            else{
                this.PasswordsMatch = true;
            }    
            //TODO: Check password requirements.
        }
        
        return allGood;
    }
}