import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Wrapper } from '@components'
import CheckInCard from './components/CheckInCard'
import AttendanceSummary from './components/AttendanceSummary'
import LeaveSummary from './components/LeaveSummary'

const Home = () => {
  return (
   <Wrapper>
    
    <CheckInCard/>

    <AttendanceSummary>

    </AttendanceSummary>

    <LeaveSummary/>

   </Wrapper>
  )
}

export default Home

const styles = StyleSheet.create({})