export interface IEventData {
    name:string,
    startDate:Date,
    endDate:Date,
    tag?:boolean
}

export interface IDBEventData {
    _id: string;
    userId: string;
    name: string;
    startDate: string; 
    endDate: string;   
    __v: number;
  }