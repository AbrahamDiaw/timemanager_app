export class UDate {
    public static replaceLetter(date) {
        return date.replace("T", " ").replace("Z", "")
    }
}