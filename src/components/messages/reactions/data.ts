import {
  Css,
  Html,
  Javascript,
  NextJs,
  NodeJs,
  React,
  Typescript,
} from '@/components/icons';

export const reactionMap = {
  javascript: {
    icon: Javascript,
    label: 'JavaScript',
  },
  typescript: {
    icon: Typescript,
    label: 'TypeScript',
  },
  nodejs: {
    icon: NodeJs,
    label: 'Node.js',
  },
  html: {
    icon: Html,
    label: 'HTML',
  },
  css: {
    icon: Css,
    label: 'CSS',
  },
  react: {
    icon: React,
    label: 'React',
  },
  nextjs: {
    icon: NextJs,
    label: 'Next.js',
  },
};

export type ReactionKey = keyof typeof reactionMap;
