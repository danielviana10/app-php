
import { Component, OnInit } from '@angular/core';
import { Course } from './courses';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];

  course!: new () => Course;

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.select();
  }

  select(){
    this.courseService.getAllCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;
      }
    )
  }

  register(): void {
    alert('Course registration successful for ');
  }

  update(): void {
    alert('Course update succesfully for ');
  }

  delete(): void {
    alert('Course deleted successfully for ');
  }
}
