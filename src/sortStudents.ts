
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
    case SortType.Surname:

      result = result.sort((a: Student, b: Student) => {
        return order === 'asc' ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
      break;

    case SortType.Age:
      result = result.sort((a: Student, b: Student) => {
        return order === 'asc' ? a.age - b.age : b.age - a.age;
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
        return order === 'asc' ? averageGrade(a) - averageGrade(b)
          : averageGrade(b) - averageGrade(a);
      });

      break;

    default:
      return result;
  }

  return result;
}
