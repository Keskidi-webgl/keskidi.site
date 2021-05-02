export type UserSelection = {
  url: string,
  description: string,
  isSelected: boolean
}

export type ActivityOneResultData = {
  answerWord: string,
  goodObjectUrl: string,
  goodObjectName: string
}


export type VoiceRecognitionResult = {
  distance: number;
  recognitionResult: string;
  textToRecognize: string;
};

export type Step = {
  id: number;
  text: string;
};
