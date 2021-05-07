/**
 * Data type for fun facts
 */
export type Slide = {
  title: string;
  description: string;
  contentType: string;
  content: string | Array<string>;
};
