export default interface EventItem {
    timestamp: number;
    price: string;
    status: string;
    snapshot:{
    BID: string[];
    ASK: string[];
    }
    index: number;
}
