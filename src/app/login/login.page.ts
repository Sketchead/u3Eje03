import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  constructor(private sService: StudentService, private fb: FormBuilder, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      controlnumber:["", Validators.compose([Validators.required])],
      nip:["", Validators.compose([Validators.required, ])],
    });

  }

  login(){
    if(this.myForm.value.controlnumber=='admin' && this.myForm.value.nip=='123'){
      this.sService.adminLogged()
      this.loggedIn()
    }else{
      let a = this.sService.getStudentByControlNumber(this.myForm.value.controlnumber)
      if(a){
        if(a.nip == this.myForm.value.nip) this.loggedInStudent()
        else{
          this.loginAlert()
        }
      }
      else this.loginAlert()  
    }
  }

  loggedIn(){
    this.router.navigate(['/home'], {
    });
  }

  loggedInStudent(){
    this.router.navigate(['/view-student'], {
      queryParams: { cn: this.myForm.value.controlnumber },
    });
  }

  async loginAlert() {
    const alert = await this.alertController.create({
      header: 'Credenciales incorrectas',
      buttons: [
        {
          text: 'OK',
          role: 'confirm'
        },
      ],
    });

    await alert.present();
  }
}
