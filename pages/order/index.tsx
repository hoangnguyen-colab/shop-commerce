import React from 'react'
import { Container } from '@components/ui'
import { ListOrder } from '@components/order'
import withAuth from '@hocs/withAuth'

function Order() {
  return (
    <Container>
      <ListOrder />
    </Container>
  )
}

export default withAuth(Order)
