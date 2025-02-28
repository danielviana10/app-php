import { Injectable } from '@angular/core';
import { Course } from './courses';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  url: string = 'http://localhost/api/php/';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<{ courses: Course[] }>(this.url + 'list').pipe(
      map((response) => response.courses),
      catchError((error) => {
        return throwError(() => 'Erro ao carregar cursos: ' + error.message);
      })
    );
  }

  registerCourse(course: Course): Observable<Course> {
    return this.http
      .post<{ course: Course }>(this.url + 'register', course)
      .pipe(
        map((response) => response.course),
        catchError((error) => {
          return throwError(() => 'Erro ao registrar curso: ' + error.message);
        })
      );
  }

  updateCourse(course: Course): Observable<Course> {
    if (course.id === undefined) {
      return throwError(() => 'O curso precisa ter um ID para ser atualizado.');
    }

    return this.http.put<{ course: Course }>(this.url + 'update', course).pipe(
      map((response) => response.course),
      catchError((error) => {
        return throwError(() => 'Erro ao atualizar curso: ' + error.message);
      })
    );
  }

  deleteCourse(course: Course): Observable<void> {
    if (course.id === undefined) {
      return throwError(() => 'O curso precisa ter um ID para ser deletado.');
    }

    const params = new HttpParams().set('id', course.id.toString());

    return this.http.delete<void>(this.url + 'delete', { params }).pipe(
      catchError((error) => {
        return throwError(() => 'Erro ao deletar curso: ' + error.message);
      })
    );
  }
}
