import { SVGProps } from 'react';
import Link from 'next/link';

import {
  Aws,
  Css,
  Docker,
  Git,
  Github,
  Html,
  Javascript,
  NextJs,
  NodeJs,
  React,
  Tailwind,
  Typescript,
  Xstate,
} from '@/components/icons';

const stack = [
  'javascript',
  'typescript',
  'nodejs',
  'css',
  'html',
  'react',
  'nextjs',
  'git',
  'tailwind',
  'xstate',
  'docker',
  'aws',
] as const;

type Tech = (typeof stack)[number];

const logos: Record<Tech, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  react: React,
  nextjs: NextJs,
  nodejs: NodeJs,
  javascript: Javascript,
  typescript: Typescript,
  css: Css,
  html: Html,
  docker: Docker,
  xstate: Xstate,
  aws: Aws,
  git: Git,
  tailwind: Tailwind,
};

export default function Page() {
  return (
    <main className="p-6 pb-32 max-w-4xl m-auto">
      <h1 className="font-[family-name:var(--font-satisfy)] text-6xl sm:text-8xl text-center py-2 pt-20 sm:py-4 sm:pt-20">
        Engineering
      </h1>

      <p className="flex justify-center pt-4 pb-20">
        <Link href="https://github.com/yifan9916">
          <Github className="h-8 w-8" />
        </Link>
      </p>

      <p className="pb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        accumsan augue mi, blandit viverra arcu malesuada id. Maecenas et
        eleifend turpis, quis porttitor ante. Sed luctus, enim vitae vulputate
        sollicitudin, magna nisl ullamcorper est, sed suscipit lacus nibh non
        ligula. Vestibulum lobortis aliquam urna quis facilisis. Nunc id cursus
        orci. Sed tristique eu arcu a consequat. Donec scelerisque, orci non
        porta aliquet, diam ligula blandit turpis, pharetra imperdiet est ligula
        et lacus. Quisque in iaculis diam, ut ultricies tortor. Nunc a enim non
        mi suscipit molestie id et erat. Integer eleifend auctor condimentum.
      </p>

      <p className="pb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        accumsan augue mi, blandit viverra arcu malesuada id. Maecenas et
        eleifend turpis, quis porttitor ante. Sed luctus, enim vitae vulputate
        sollicitudin, magna nisl ullamcorper est, sed suscipit lacus nibh non
        ligula. Vestibulum lobortis aliquam urna quis facilisis. Nunc id cursus
        orci. Sed tristique eu arcu a consequat. Donec scelerisque, orci non
        porta aliquet, diam ligula blandit turpis, pharetra imperdiet est ligula
        et lacus. Quisque in iaculis diam, ut ultricies tortor. Nunc a enim non
        mi suscipit molestie id et erat. Integer eleifend auctor condimentum.
      </p>

      <ul className="flex gap-4 flex-wrap flex-dire justify-center py-8">
        {stack.map((tech) => {
          const Logo = logos[tech];
          return (
            <li title={tech} key={tech}>
              <Logo className="h-7 w-7" />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
