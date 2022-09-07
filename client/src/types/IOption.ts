export interface IOption {
  id: number;
  content: string;
  isCorrect: boolean;
}

export interface IOptionWithoutAnswer {
  id: number;
  content: string;
}
