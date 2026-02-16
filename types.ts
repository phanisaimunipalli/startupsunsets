export interface Startup {
  id: string;
  name: string;
  industry: string;
  founded: string;
  founders: string; // Names of the founders
  sunset: string;
  raised: string;
  description: string;
  lessonLearned: string; // The "Badge"
  whatIf: string; // The alternate history
  focusArea: string; // e.g. Regulation, Churn
  analogy: string; // Simple comparison
  mentalModel: string; // Cognitive framework
  pivotStrategy: string; // What they should have done
  sourceUrl: string; // Link to Crunchbase/TechCrunch/Any Reputable Source
}

export interface Category {
  id: string;
  name: string;
  description: string;
  focus: string; // The specific challenge (e.g., "Regulation & Capital")
}

export type ViewState = 'home' | 'category' | 'detail';
