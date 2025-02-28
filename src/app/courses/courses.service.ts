import { Injectable } from '@angular/core';
import { Course } from './courses';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importação correta do map

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  url: string = 'http://localhost/api/php/';

  courses: Course[] = [];

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<{ courses: Course[] }>(this.url + 'list').pipe(
      map((response) => {
        this.courses = response.courses;
        return this.courses;
      })
    );
  }
}
