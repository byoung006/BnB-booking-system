export interface Input {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  events: {
    id: string;
  };
  name: string;
  eventDataErrors: string;
  placeholder: string;
  type: string;
  textArea: boolean;
  phrase: {
    id: string;
  };
}
