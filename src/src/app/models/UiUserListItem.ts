import { UiRoleListItem } from '.';

export class UiUserListItem {
    public Id: string;
    public UserName: string;
    public TwoFactorEnabled: boolean;
    public Email: string;
    public PhoneNumber: string;
    public PhoneNumberConfirmed: string;
    public Roles: UiRoleListItem[];

    public Validated: boolean = false;
    public UserNameIsValid: boolean = true;
    public EmailIsValid: boolean = true;

    public validate() : boolean{
        let allGood = true;
        if(this.UserName == null || this.UserName.trim() === ''){
            allGood = false;
            this.UserNameIsValid = false;
        }
        else{
            this.UserNameIsValid = true;
        }
        let regexpEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$');
        if(this.Email == null || this.Email.trim() === '' || !regexpEmail.test(this.Email)){
            allGood = false;
            this.EmailIsValid = false;
        }
        else{
            this.EmailIsValid = true;
        }
        this.Validated = true;
        return allGood;
    }
}
