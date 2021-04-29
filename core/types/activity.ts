export type UserObjectSelection = {
  name: string;
  description: string;
};

export type VoiceRecognitionResult = {
  distance: number;
  recognitionResult: string;
  textToRecognize: string;
};

export type Step = {
  id: number;
  text: string;
};
