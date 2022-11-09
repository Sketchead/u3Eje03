import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {
  public student: Student;
  public myForm: FormGroup;
  public validationMessages: Object;
  constructor(private sService: StudentService, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group(
      {
        controlNumber:["",Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(8),Validators.pattern('^[0-9]+$')])],
      }
    );  
    this.validationMessages = {
      controlNumber: [
        {type: 'required', message: "Podri mucho sexo"},
        {type: 'minlength', message: "Longitud mínima 8 carácteres"},
        {type: 'maxlength', message: "Longitud máxima 8 carácteres"},
        {type: 'pattern', message: "Podri solo puede contener números"}
      ]
    }

    
  }

  public newStudent(){
    //Construir el objeto
    this.sService.newStudent(this.student);
  }
}
