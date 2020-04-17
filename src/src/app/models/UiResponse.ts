export class UiResponseMessage{
    public Code: string;
    public Message: string;
}
export class UiResponse {
    public Success: boolean;
    public Messages: UiResponseMessage[];
}
