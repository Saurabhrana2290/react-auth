import {Subject} from "rxjs";

const newSubject = new Subject();
// export const newDataService ={
//     init: param => newSubject.next(param),
//     status: () => newSubject.asObservable()
// }

export const newDataService ={
    init: param => newSubject.next({username: param}),
    status: () => newSubject.asObservable()
}