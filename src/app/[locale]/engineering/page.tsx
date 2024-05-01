import Link from 'next/link';
import { SVGProps } from 'react';

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
    <main className="p-4 pb-32 max-w-4xl m-auto">
      <h1 className="font-[family-name:var(--font-satisfy)] text-5xl sm:text-[80px] text-center py-2 pt-20 sm:py-4 sm:pt-20">
        Engineering
      </h1>

      <p className="flex justify-center pb-20">
        <Link href="https://github.com/yifan9916">
          <Github style={{ height: '40px', width: '40px' }} />
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
              <Logo style={{ height: '32px', width: '32px' }} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
