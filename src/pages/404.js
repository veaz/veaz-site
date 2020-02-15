import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Layout from '../layout/layout'

import SEO from '../components/SEO'
import SuperText from '../components/SuperText'

const Center = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const FourOhFour = () => {
  return (
    <Layout>
      <SEO title='FOUR OH FOUR!' />
      <Center>
        <SuperText size='3em'>CuatroCeroCuatro</SuperText>
        <p>Me parece que andas un poco perdido.</p>
        <Link to='/'>Ve a inicio.</Link>
      </Center>
    </Layout>
  )
}

export default FourOhFour
