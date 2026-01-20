
import type React from 'react';

export interface SlideContent {
  id: number;
  title: string;
  component: React.FC<any>;
}
