import React from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from 'next/link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

type Props = {
  children: React.ReactNode
}

type HeaderLinkProps = {
  key: React.Key
  href: string
  title: string
  startIcon: JSX.Element
  className: string
  classNameIcon: string
}

const HeaderLink = ({ key, href, title, startIcon, className, classNameIcon }: HeaderLinkProps) => {
  const Icon = startIcon
  return (
    <Link key={key} href={href}>
      <a className={className}>
        <Icon className={classNameIcon} />
        {title}
      </a>
    </Link>
  )
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo className="h-20 w-20 hover:animate-spin" />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hover-underline-animation hidden text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-4">
            <div className="">
              {headerNavLinks.map((link) => (
                <HeaderLink
                  key={link.title}
                  href={link.href}
                  title={link.title}
                  className="hover-underline-animation inline-flex flex-row items-end p-2 font-semibold text-gray-900 dark:text-gray-100"
                  startIcon={link.icon}
                  classNameIcon="mr-2 h-5 w-5"
                />
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
