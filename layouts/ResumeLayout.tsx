import { ReactNode } from 'react'
import type { Resume } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import TOCInline from '@/components/TOCInline'
import SectionContainer from '@/components/SectionContainer'

interface Props {
  children: ReactNode
  content: Omit<Resume, '_id' | '_raw' | 'body'>
}

export default function ResumeLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github, toc } = content

  return (
    <SectionContainer>
      <article>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Resume
            </h1>
            <p className="text-base md:text-lg md:leading-7 text-gray-500 dark:text-gray-400">
              My professional career, experiences, and skills.
            </p>
          </div>
          <div className="items-start space-y-2 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:space-y-0">
            <div className="flex flex-col items-center space-x-2 pt-8 divide-y divide-gray-200 dark:divide-gray-700">
              <div className="flex flex-col items-center pb-4">
                {avatar && (
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={192}
                    height={192}
                    className="h-48 w-48 rounded-full object-cover"
                  />
                )}
                <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
                <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
                <div className="text-gray-500 dark:text-gray-400">{company}</div>
                <div className="flex space-x-3 pt-6">
                  <SocialIcon kind="mail" href={`mailto:${email}`} />
                  <SocialIcon kind="github" href={github} />
                  <SocialIcon kind="linkedin" href={linkedin} />
                  <SocialIcon kind="twitter" href={twitter} />
                </div>
              </div>

              <div className="xl:block hidden">
                <TOCInline asDisclosure={false} toc={toc} />
              </div>
            </div>
            <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-3">
              {children}
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}