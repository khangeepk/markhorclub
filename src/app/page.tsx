import React from 'react'
import Hero from '../components/home/Hero'
import BrandStory from '../components/home/BrandStory'
import LocationDestination from '../components/home/LocationDestination'
import ClubExperience from '../components/home/ClubExperience'
import OutdoorAdventure from '../components/home/OutdoorAdventure'
import AquaExperience from '../components/home/AquaExperience'
import MasterPlan from '../components/home/MasterPlan'
import LifestyleGallery from '../components/home/LifestyleGallery'
import Membership from '../components/home/Membership'
import Contact from '../components/home/Contact'

export default function Page() {
  return (
    <>
      <Hero />
      <BrandStory />
      <LocationDestination />
      <ClubExperience />
      <OutdoorAdventure />
      <AquaExperience />
      <MasterPlan />
      <LifestyleGallery />
      <Membership />
      <Contact />
    </>
  )
}
