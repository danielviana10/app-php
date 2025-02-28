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
  course: Course = new Course();
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.select();
  }

  select() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.courseService.getAllCourses().subscribe(
      (courses) => {
        this.courses = courses;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }

  register() {
    if (this.course.id) {
      this.errorMessage = 'Para atualizar um curso, use o botão "Update".';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.courseService.registerCourse(this.course).subscribe(
      (newCourse) => {
        this.courses.push(newCourse);
        this.course = new Course();
        this.successMessage = 'Curso registrado com sucesso!';
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }

  update() {
    if (!this.course.id) {
      this.errorMessage = 'Selecione um curso para atualizar.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.courseService.updateCourse(this.course).subscribe(
      (updatedCourse) => {
        const index = this.courses.findIndex((c) => c.id === updatedCourse.id);
        if (index !== -1) {
          this.courses[index] = updatedCourse;
        }
        this.course = new Course();
        this.successMessage = 'Curso atualizado com sucesso!';
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }

  delete(course: Course) {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.courseService.deleteCourse(course).subscribe(
      () => {
        this.courses = this.courses.filter((c) => c.id !== course.id);
        this.successMessage = 'Curso deletado com sucesso!';
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }

  selectCourse(course: Course) {
    this.course = { ...course };
  }
}
