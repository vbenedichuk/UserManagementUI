export class UiRoleListItem {
    public Id: string;
    public Name: string;
    public Validated: boolean = false;
    public RoleNameIsValid: boolean = false;
    
    public validate() : boolean{
        let allGood = true;
        if(this.Name == null || this.Name.trim() === ''){
            allGood = false;
            this.RoleNameIsValid = false;
        }
        else{
            this.RoleNameIsValid = true;
        }
        this.Validated = true;
        return allGood;
    }
}
