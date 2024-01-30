import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-blue-500 dark:text-zinc-200 dark:hover:text-blue-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-blue-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description: 'I’m James Swent. I help build products that matter.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I’m James Swent. I help build products that matter.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I&apos;ve loved building and tinkering with things for as long as
              I can remember. From the day my Dad brought home a clunky old
              ThinkPad for me to play with, I was hooked. I became obsessed with
              computers, and I wrote my first program at 6 years old to
              circumvent the parental controls and firewall on my computer.
            </p>
            <p>
              Then came the iPhone, and everything changed. I begged and begged
              my Mom to buy one, and by the time she finally did (nearly two
              years after the first release) the app race had already begun. I
              built my first app in Apple&apos;s Objective-C at 10 years old on
              my Mom&apos;s plastic white MacBook - a simple tool to help
              practice your times tables. Sadly, I had missed the gold rush
            </p>
            <p>
              Fast forward to the end of high school, and I had no idea where to
              go in my life. My first summer after graduating a family friend
              got me a job in the legal department of a large energy company. My
              first day on the job I&apos;m given a big research project - one
              that typically takes a paralegal a whole 2 weeks. It looked
              terribly boring, so I opened up my PyCharm, threw together a few
              Selenium scripts, and handed in the project at the end of that
              day. It was then I realised I had something special.
            </p>
            <p>
              Today, I’m the founder and CEO of Swent Consulting, where we help
              organizations build internal and external products that rival the
              leading SaaS solutions — all by focusing on our client&apos;s
              specific needs.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://twitter.com/JamesSwent" icon={XIcon}>
              Follow on X
            </SocialLink>
            {/* <SocialLink href="#" icon={InstagramIcon} className="mt-4"> */}
            {/*   Follow on Instagram */}
            {/* </SocialLink> */}
            <SocialLink
              href="https://github.com/jswent"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/jswent"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:contact@jwswent.tech"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              contact@jwswent.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
