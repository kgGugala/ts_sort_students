
export interface Student {
  name: string;
  surname: string;
  age: number;
  married: boolean;
  grades: number[];
}

export enum SortType {
  Name = 'name',
  Surname = 'surname',
  Age = 'age',
  Married = 'married',
  Grades = 'grades'
}

// create SortOrder type
export type SortOrder = 'asc' | 'desc';

function averageGrade(student: Student): number {
  return student.grades.reduce((sum, grade) => (
    sum + grade
  ), 0);
}

export function sortStudents(students: Student[],
  sortBy: SortType,
  order: SortOrder): Student[] {
  let result = [...students];

  switch (sortBy) {
    case SortType.Name:
      result = result.sort((a: Student, b: Student) => {
        if (order === 'asc') {
          return a.name.localeCompare(b.name);
        }

        return b.name.localeCompare(a.name);
      });
      break;

    case SortType.Surname:
      result = result.sort((a: Student, b: Student) => {
        if (order === 'asc') {
          return a.surname.localeCompare(b.surname);
        }

        return b.surname.localeCompare(a.surname);
      });
      break;

    case SortType.Age:
      result = result.sort((a: Student, b: Student) => {
        if (order === 'asc') {
          return a.age - b.age;
        }

        return b.age - a.age;
      });
      break;

    case SortType.Married:
      result = result.sort((a, b) => {
        if (a.married && !b.married) {
          return -1;
        }

        if (!a.married && b.married) {
          return 1;
        }

        return 0;
      });
      break;

    case SortType.Grades:
      result = result.sort((a, b) => {
        if (order === 'asc') {
          return averageGrade(a) - averageGrade(b);
        }

        return averageGrade(b) - averageGrade(a);
      });

      break;

    default:
      return result;
  }

  return result;
}
