export interface User {
  email: string;
  gender: string;
  job_group: string;
  name: string;
  prefer: Prefer;
}

export interface Prefer {
  welfare: number;
  pay: number;
  task: number;
  commute: number;
  culture: number;
}
