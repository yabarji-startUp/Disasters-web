import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  tone: string
  tip?: string
}

export default function StatsCard({ icon: Icon, title, value, tone, tip }: StatsCardProps) {
  return (
    <div 
      className={`backdrop-blur-lg rounded-2xl p-8 border hover:bg-white/15 hover:scale-105 transition ${tone}`} 
      title={tip || ''}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8" />
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
  )
} 