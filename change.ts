

type Address<T>={
    city:string,
    houseNumber:number,
    nearestMark?:T;
}


type Employee = {
    name:string,
    id:string,
    age?:number,
    salary:string,
    address?:Address<string|number>
}


function EmployeeDetails(e:Employee):void{
    if(e.address){
        console.log(e);
    }
}