export interface IComent {
  rate: number;
  context: string;
}

export interface IPosts {
  title: string;
  id: number;
  coments: IComent[];
  disabled: boolean;
  average?: number;
}
