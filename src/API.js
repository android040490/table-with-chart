import students from './mockData';

export function fetchStudents(){
    return new Promise((resolve, reject)=>{
        resolve(students)
    })
}