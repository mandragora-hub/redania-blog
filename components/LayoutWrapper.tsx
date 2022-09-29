import React from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from 'next/link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import ThemeSwitch from './ThemeSwitch'
import HeaderIcon from './header-icons'

type Props = {
  children: React.ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="group flex items-center justify-between">
              <Logo className="mr-1 h-10 w-10 text-gray-900 group-hover:animate-spin dark:text-gray-100" />
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hover-underline-animation hidden text-2xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
          <div className="flex items-center text-base leading-5">
            <div className="">
              {headerNavLinks.map(({ kind, href }) => (
                <HeaderIcon key={kind} kind={kind} href={href} />
              ))}
            </div>
            <ThemeSwitch />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
