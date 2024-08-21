import { withClickOutside } from '@/components/hocs/withClickOutside'
import { useLang } from '@/hooks/useLang'
import { useUserLogout } from '@/hooks/useLogout'
// import { useUserAvatar } from '@/hooks/useUserAvatar'
import { IAmWrappedComponentProps } from '@/types/hocs'
import Image from 'next/image'
import { forwardRef } from 'react'
import profile_check from '../../../public/img/icons/profile_check.svg'
import Link from 'next/link'

const HeaderProfile = forwardRef<HTMLDivElement, IAmWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const handleTogglePopup = () => setOpen(!open)
    const handleLogout = useUserLogout()
    // const { src, alt } = useUserAvatar()
    const { lang, translations } = useLang()

    return (
      <div className='header_profile_popup' ref={ref}>
        <button
          className='header_profile_btn'
          onClick={handleTogglePopup}
        >
          <Image
            // src= {src ? src : '/img/profile.svg'}
            src= {profile_check}
            // alt={alt ? alt : 'profile'}
            alt={'profile'}
            width={24}
            height={24}
          />
        </button>
          {open && (
            <ul className='header_profile_block body_medium'
            >
              <li className='header_profile_item'>
                <button onClick={handleTogglePopup}>
                  <Link href='/my-account/dashboard' className='header_profile_item_btn'>
                    {translations[lang].header.profile}
                  </Link>
                </button>
              </li>
              <li className='header_profile_item'>
                <button
                  className='header_profile_item_btn'
                  onClick={handleLogout}
                >
                  {translations[lang].header.logout}
                </button>
              </li>
            </ul>
          )}
      </div>
    )
  }
)

HeaderProfile.displayName = 'HeaderProfile'

export default withClickOutside(HeaderProfile)