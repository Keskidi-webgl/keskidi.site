import stringSimilarity from "string-similarity";
import { VoiceRecognitionResult } from "~/core/types";

class VoiceRecognitionManager {
  private _textToRecognize: string = "";
  private _recognition!: SpeechRecognition;

  constructor() {
    this._recognition = this._initApiRecognition();
  }

  public setTextToRecognize(text: string) {
    this._textToRecognize = text;
  }

  /**
   * Callback on result recognition
   */
  onResult(callable: (result: VoiceRecognitionResult) => void) {
    this._recognition.onresult = event => {
      const recognitionResult = event.results[0][0].transcript;
      const distance = stringSimilarity.compareTwoStrings(
        this._formatForComparison(this._textToRecognize),
        this._formatForComparison(recognitionResult)
      );

      const result: VoiceRecognitionResult = {
        distance,
        recognitionResult,
        textToRecognize: this._textToRecognize
      };

      callable(result);
    };

    return this;
  }

  /**
   * Callback on end recognition
   */
  onEnd(callable: () => void) {
    this._recognition.onend = callable;
  }

  /**
   * Start recognition
   */
  public start() {
    if (!this._recognition) {
      throw new Error("Recognition property is not initialized");
    }

    if (!this._recognition) {
      throw new Error(
        "You need to set a word to compare before start recognition !"
      );
    }

    this._recognition.start();
  }

  /**
   * Force recognition to stop
   */
  stop() {
    if (!this._recognition) {
      throw new Error("Recognition property is not initialized");
    }

    this._recognition.stop();
  }

  /**
   * Init Api recognition
   */
  private _initApiRecognition(): SpeechRecognition {
    // @ts-ignore
    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;

    return recognition;
  }

  /**
   * Format text for comparison
   */
  private _formatForComparison(text: string) {
    return text.toLowerCase().replace("/s/g", "");
  }
}

let isChrome = navigator.userAgent.indexOf("Chrome") != -1;

const instance = isChrome ? new VoiceRecognitionManager() : null;

export default instance;
