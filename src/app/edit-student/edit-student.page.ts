import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {
  public student: Student;
  public myForm: FormGroup;
  public validationMessages: Object;
  constructor(private sService: StudentService, private fb: FormBuilder,private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.student = this.sService.getStudentByControlNumber(params.cn);
    });

    this.myForm = this.fb.group({
      controlnumber:["", Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8), Validators.pattern('^[0-9]+$')])],
      name:["", Validators.compose([Validators.required])],
      curp:["", Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$')])],
      age:["", Validators.compose([Validators.required, Validators.min(17), Validators.max(99)])],
      nip:["", Validators.compose([Validators.required, Validators.min(10), Validators.max(9999)])],
      email:["", Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')])],
      career:["", Validators.compose([Validators.required])],
      photo:["", Validators.compose([Validators.required, Validators.pattern(/https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/)])]
    });

    this.validationMessages = {
      controlnumber: [
        {type: 'required', message: "Número de control obligatorio"},
        {type: 'minlength', message: "El número de control debe ser de 8 dígitos"},
        {type: 'maxlength', message: "El número de control debe ser de 8 dígitos"},
        {type: 'pattern', message: "El número de control está mal formado"}
      ],
      name: [
        {type: 'required', message: "Nombre requerido"}
      ],
      curp: [
        {type: 'required', message: "CURP obligatorio"},
        {type: 'minlength', message: "El CURP debe ser de 17 dígitos"},
        {type: 'maxlength', message: "El CURP debe ser de 17 dígitos"},
        {type: 'pattern', message: "El CURP está mal formado"}
      ],
      age: [
        {type: 'required', message: "Edad obligatorio"},
        {type: 'min', message: "Debes ser mayor a 16 años"},
        {type: 'max', message: "No puedes ingresar una edad +99"}
      ],
      nip: [
        {type: 'required', message: "NIP obligatorio"},
        {type: 'min', message: "NIP debe ser mayor a 9"},
        {type: 'max', message: "NIP debe ser menor a 10000"}
      ],
      email: [
        {type: 'required', message: "Email obligatorio"},
        {type: 'pattern', message: "Ingresa un correo valido"}
      ],
      photo: [
        {type: 'required', message: "Photo (URL) obligatorio"},
        {type: 'pattern', message: "Ingresa una URL valida"}
      ],
      career: [
        {type: 'required', message: "Carrera requerido"}
      ]
    }
  }

  public editStudent(){
    this.student={
      controlnumber: this.myForm.value.controlnumber,
      age: this.myForm.value.age,
      career: this.myForm.value.career,
      curp: this.myForm.value.curp,
      email: this.myForm.value.email,
      name: this.myForm.value.name,
      nip: this.myForm.value.nip,
      photo: this.myForm.value.photo
    }

    this.sService.editStudent(this.student);
    this.router.navigate(['/home'], {
    });
  }

}
