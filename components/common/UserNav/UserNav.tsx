import { FC, useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import type { LineItem } from '@lib/types/cart'
import { Avatar } from '@components/common'
import { Heart, Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import Button from '@components/ui/Button'
import DropdownMenu from './DropdownMenu'
import s from './UserNav.module.css'
import { useIsAuthenticated } from '@contexts/AuthContext'

interface Props {
  className?: string
}

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC<Props> = ({ className }) => {
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  const [customer, setCustomer] = useState(false)
  // const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0
  const auth = useIsAuthenticated()

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        <li className={s.item}>
          <Button
            className={s.item}
            variant="naked"
            onClick={toggleSidebar}
            aria-label="Cart"
          >
            <Bag />
            {/* {itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>} */}
          </Button>
        </li>
        {auth && (
          <li className={s.item}>
            <Link href="/wishlist">
              <a onClick={closeSidebarIfPresent} aria-label="Wishlist">
                <Heart />
              </a>
            </Link>
          </li>
        )}
        <li className={s.item}>
          {auth ? (
            <DropdownMenu />
          ) : (
            <button
              className={s.avatarButton}
              aria-label="Menu"
              onClick={() => openModal()}
            >
              <Avatar />
            </button>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
