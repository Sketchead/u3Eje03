import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student: Student;
  isAdmin: boolean = false;
  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute,private router: Router) {
    this.isAdmin = studentService.isAdmin();
  }

  ngOnInit() {
    // let cn;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.student = this.studentService.getStudentByControlNumber(params.cn);
    });
    // console.log(cn);
  }

  public editStudent(cn: string): void {
    //console.log(this.studentService.getStudentByControlNumber(cn));
    this.router.navigate(['/edit-student'], {
      queryParams: { cn: cn },
    });
  }
}
