import { Injectable } from '@angular/core';
import { Student } from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];
  private admin: boolean = false;
  constructor() {
    this.students = [
      {
        controlnumber: "18401183",
        age: 22,
        career: "isc",
        curp: "RIMA000102HNTCCTA4",
        email: "atraricoma@ittepic.edu.mx",
        name: "Atxel Rafael Rico Macías",
        nip: 766,
        photo: 'https://picsum.photos/600/?random=2'
      },
      {
        controlnumber: "18401135",
        age: 22,
        career: "isc",
        curp: "HEGE000601HNTRRDA7",
        email: "edanherreraga@ittepic.edu.mx",
        name: "Eduardo Antonio Herrera García",
        nip: 484,
        photo: 'https://picsum.photos/600/?random=1'
      }, 
      {
        controlnumber: "18401179",
        age: 22,
        career: "ic",
        curp: "PETE000906HNTRLDA1",
        email: "edgeperezto@ittepic.edu.mx",
        name: "Edsson Gerardo Pérez Tolentino",
        nip: 919,
        photo: 'https://picsum.photos/600/?random=3'
      }
    ];
  }

  public getStudents(): Student[]{
    return this.students;
  }

  public removeStudent(pos: number): Student[]{
    this.students.splice(pos, 1);
    return this.students;
  }

  public getStudentByControlNumber(controlnumber: string): Student {
    let item: Student = this.students.find((student)=> {
      return student.controlnumber===controlnumber;
    });
    return item;
  }

  public editStudent(st: Student) {
    this.students.find((student)=> {
      if(student.controlnumber===st.controlnumber)
        student=st 
    });
  }

  public newStudent(student: Student){
    this.students.push(student);
  }

  isAdmin(){
    return this.admin;
  }

  adminLogged(){
    this.admin=true;
  }

  adminLoggedOut(){
    this.admin=false;
  }
}
