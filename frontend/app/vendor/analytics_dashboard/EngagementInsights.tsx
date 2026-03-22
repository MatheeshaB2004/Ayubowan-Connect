"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, TargetIcon } from 'lucide-react';
import { Insight } from './datas';
interface EngagementInsightsProps {
  insights: Insight[];
}
const highlights: Record<number, string> = {
  0: 'Saturday',
  1: '6PM–9PM',
  2: '8.3%'
};
function HighlightText({ text, index }: {text: string;index: number;}) {
  const word = highlights[index];
  if (!word || !text.includes(word)) return <>{text}</>;
  const [before, after] = text.split(word);
  return (
    <>
      {before}
      <span className="insight-highlight">{word}</span>
      {after}
    </>);

}
export default function EngagementInsights({ insights }: EngagementInsightsProps) {
  const icons = [CalendarIcon, ClockIcon, TargetIcon];
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay: 0.2
      }}
      className="insights-container">

      {(Array.isArray(insights) ? insights : []).map((insight, index) => {
        const Icon = icons[index] ?? TargetIcon;
        return (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.25 + index * 0.1
            }}
            className="insight-card">

            <div className="insight-icon">
              <Icon className="insight-icon-svg" />
            </div>
            <div className="insight-content">
              <span className="insight-label">
                Insight
              </span>
              <p className="insight-text">
                <HighlightText text={insight.text} index={index} />
              </p>
            </div>
          </motion.div>);

      })}
    </motion.div>);

}