import HeroHighlightSection from '@/components/global/HeroHighlightSection'

import React from 'react'
import CategoryNavigation from './_components/CategoryNavigation'
import { Lamp, Monitor, Mouse, Sofa } from 'lucide-react'

  const categories = [
    {
      id: "computer",
      name: "Computer",
      color: "bg-purple-600",
      hoverColor: "bg-purple-50",
      textColor: "text-white",
      icon: (
        <Monitor className="w-5 h-5 text-purple group-hover:text-gray-800 group-[.bg-purple-600]:text-white" />
      ),
    },
    {
      id: "mobel",
      name: "Möbel",
      color: "bg-rose-600",
      hoverColor: "bg-rose-50",
      textColor: "text-white",
      icon: <Sofa className="w-5 h-5 text-rose-600 group-hover:text-rose-600 group-[.bg-rose-600]:text-white" />,
    },
    {
      id: "peripherie",
      name: "Peripherie",
      color: "bg-amber-500",
      hoverColor: "bg-amber-50",
      textColor: "text-white",
      icon: <Mouse className="w-5 h-5 text-amber-500 group-hover:text-amber-500 group-[.bg-amber-500]:text-white" />,
    },
    {
      id: "deko",
      name: "Deko",
      color: "bg-emerald-600",
      hoverColor: "bg-emerald-50",
      textColor: "text-white",
      icon: (
        <Lamp className="w-5 h-5 text-emerald-600 group-hover:text-emerald-600 group-[.bg-emerald-600]:text-white" />
      ),
    },
  ]

const buildPage = () => {
  return (
    <div>
      <HeroHighlightSection
      title='Why Choose Our Configurator'
      highlight='Our'
      description='Custom-build your perfect PC with our intelligent configurator.
Answer a few questions and let us recommend the best components
for your needs.'
/>

<div className='grid grid-cols-1 md:grid-cols-2  gap-5 p-5'>
  <div>
      <CategoryNavigation categories={categories} />
  </div>
  <div>
    b
  </div>

</div>
    </div>
  )
}

export default buildPage