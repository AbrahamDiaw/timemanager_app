export class UDate {
    public static formatDateForInput(date: any) {
        return date.replace("Z", "").substring(0, 16);
    }
    public static formatDate(date: any) {
        return date.replace("T", " ").replace("Z", " ");
    }
}