import React from 'react'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import { AuthorFrontMatterTypes } from '@/common/types'
import TextScramble from '@/components/TextScramble'

type AboutLayoutProps = {
  children: React.ReactNode
  frontMatter: AuthorFrontMatterTypes
}

const ImgComponent = ({ src }: { src: string }) => {
  return (
    <div className="mr-5 min-w-fit">
      <Image
        src={src}
        alt="avatar"
        width="48 px"
        height="48px"
        className="h-48 w-48 rounded-full"
      />
    </div>
  )
}

const WorkExperience = () => {
  return (
    <div className="my-4 flex flex-col">
      <span className="font-poppins title-font text-3xl font-black font-bold">Work Experience</span>
      <span className="mb-10 inline-block h-0.5 w-20 rounded bg-accent" />
      <div className="flex flex-col space-y-10 ">
        <div className="flex">
          <ImgComponent src="/static/images/logo-mh.png" />
          <div className="">
            <h3 className="text-lg font-bold leading-snug">
              Devops Engineer at{' '}
              <Link className="text-sky-500 hover:underline" href="https://www.hacienda.gob.do/">
                MH
              </Link>
            </h3>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Oct 2021 - <span className="font-bold">Now</span>
            </span>
          </div>
        </div>
        <div className="flex">
          <ImgComponent src="/static/images/avatar.png" />
          <div className="">
            <h3 className="text-lg font-bold leading-snug">
              <Link className="text-sky-500 hover:underline" href="https://loremipsum.io/">
                Ipsum
              </Link>
            </h3>
            <span className="text-sm text-gray-700 dark:text-gray-300">May 2021 - Aug 2021</span>
            <div className="before:content-[' '] relative mt-5 before:absolute before:-left-[43px] before:top-[34px] before:h-[calc(100%-20px)] before:w-[2px] before:bg-secondary-500">
              <span className="absolute -left-12 top-2 block h-3 w-3 rounded-full bg-secondary-500"></span>
              <h3 className="text-lg font-bold leading-snug">Backend Developer</h3>
              <span className="text-sm text-gray-700 dark:text-gray-300">Jun 2021 - Aug 2021</span>
              <p className="my-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="relative mt-5">
              <span className="absolute -left-12 top-2 block h-3 w-3 rounded-full bg-secondary-500"></span>
              <h3 className="text-lg font-bold leading-snug">Software Engineer</h3>
              <span className="text-sm text-gray-700 dark:text-gray-300">May 2021 - Jun 2021</span>
              <p className="my-5">
                Eget sit amet tellus cras adipiscing enim eu. Et pharetra pharetra massa massa.
                Vitae sapien pellentesque habitant morbi tristique. Bibendum neque egestas congue
                quisque egestas diam. Diam in arcu cursus euismod quis viverra.
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <ImgComponent src="/static/images/logo-mrs.jpg" />
          <div className="">
            <h3 className="text-lg font-bold leading-snug">
              Full Stack Developer at{' '}
              <Link
                className="text-sky-500 hover:underline"
                href="https://do.linkedin.com/company/media-revolution-srl"
              >
                Media Revolution
              </Link>
            </h3>
            <span className="text-sm text-gray-700 dark:text-gray-300">April 2021 - Oct 2021</span>
            <p className="my-5">
              As a Front-End Developer I created a lot of different websites for our clients using
              Wordpress as a CMS and HTML, CSS and JavaScript to built the sites. I helped to
              improve the developer experience of the company by implementing tools to improve our
              software development process.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Education = () => {
  return (
    <div className="my-4 flex flex-col">
      <span className="font-poppins title-font text-3xl font-black font-bold">Education</span>
      <span className="mb-10 inline-block h-0.5 w-20 rounded bg-accent" />
      <div className="flex flex-col space-y-10 ">
        <div className="flex">
          <div className="">
            <h3 className="text-lg font-bold leading-snug">
              Software Engineer at{' '}
              <Link className="text-sky-500 hover:underline" href="https://unapec.edu.do/">
                Unapec
              </Link>
            </h3>
            <span className="text-sm text-gray-700 dark:text-gray-300">Jan 2017 - May 2023</span>
          </div>
        </div>
        <div className="flex">
          <div className="">
            <h3 className="text-lg font-bold leading-snug">
              Self-taught at{' '}
              <Link className="text-sky-500 hover:underline" href="#">
                anywhere in the 🌍
              </Link>
            </h3>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Oct 1998 -<span className="font-bold">Now</span>
            </span>
            <p className="my-5">
              The things I learned by myself became the vast majority of what I know today.
              #AlwaysLearning
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const WorkedOn = () => {
  const tools = [
    'Docker',
    'React JS',
    'TailwindCSS',
    'Node JS',
    'HTML5',
    'Jenkins',
    'React Testing Library',
    'Jest',
    'GNU/Linux',
    'C++',
    'Ubuntu',
    'C++/Qt',
    'JavaScript',
    'Qt/Qml',
    'MySQL',
    'Dbeauver',
    'Mongoose',
    'REST APIs',
    'Vs Code',
    'Typescript',
    'Next.js',
  ]

  return (
    <div className="my-4 flex flex-col">
      <span className="font-poppins title-font text-3xl font-black font-bold">I've worked on</span>
      <span className="mb-10 inline-block h-0.5 w-20 rounded bg-accent" />
      <div className="flex w-full flex-wrap">
        {tools.map((tool, index) => (
          <span
            key={index}
            className="m-1 inline-block rounded border border-gray-700 py-1 px-2 text-xs font-medium hover:border-red-900 hover:shadow"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AboutLayout({ children, frontMatter }: AboutLayoutProps) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src={avatar}
              alt="avatar"
              width="192px"
              height="192px"
              className="h-48 w-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <TextScramble className="text-gray-500 dark:text-gray-400" phrases={occupation} />
            <TextScramble className="text-gray-500 dark:text-gray-400" phrases={company} />
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" size={6} href={`mailto:${email}`} />
              <SocialIcon kind="github" size={6} href={github} />
              <SocialIcon kind="linkedin" size={6} href={linkedin} />
              <SocialIcon kind="twitter" size={6} href={twitter} />
            </div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">{children}</div>
          <div className="max-w-none pt-8 pb-8 xl:col-span-2">
            <WorkExperience />
          </div>
          <div className="max-w-none pt-8 pb-8 xl:col-span-1">
            <WorkedOn />
          </div>
          <div className="max-w-none pt-8 pb-8 xl:col-span-3">
            <Education />
          </div>
        </div>
      </div>
    </>
  )
}
